(this["webpackJsonpgoogle-maps-assignment"]=this["webpackJsonpgoogle-maps-assignment"]||[]).push([[0],{13:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAmUlEQVQYlVWQQQqFMAxEZ9qKB+kBdFe6VcRT6Ll0LYXecv7Cn/7fQMhAJi8hwDeO49A4jiIp773O8xT+I8Yo55yccwIg770AKMb4Gu/7FgCRFAABaGaSuq5LyDkrhNA1LUkqpSQY2qppkj/6tm3dtFGNtK6rUGvtCLbWSM/zvMfv+96MwzA0vSxL/4ZSiuZ5FgBN06RSSjN8AMfcWVyAHPC7AAAAAElFTkSuQmCC"},17:function(e,t,n){e.exports=n(41)},22:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(3),l=n.n(r),c=(n(22),n(14)),s=n(10),i=n(11),d=n(15),u=n(12),p=n(16),g=(n(7),n(13)),h=n.n(g),m=n(5),A=n(4),C=n.n(A);function f(e){return o.a.createElement(C.a,{value:e.address,onChange:e.handleChange,onSelect:e.handleSelect},(function(e){var t=e.getInputProps,n=e.suggestions,a=e.getSuggestionItemProps,r=e.loading;return o.a.createElement("div",null,o.a.createElement("input",t({placeholder:"Enter an address"})),o.a.createElement("div",null,r?o.a.createElement("div",null,"Loading..."):null,n.map((function(e){var t={backgroundColor:e.active?"#41b6e6":"#000"};return o.a.createElement("div",a(e,{style:t}),e.description)}))))}))}var v={width:"80vw",height:"80vh",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},k=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){n.setState({address:e})},n.handleSelect=function(e){Object(A.geocodeByAddress)(e).then((function(e){return Object(A.getLatLng)(e[0])})).then((function(e){console.log("Success",e),n.setState({currentCoord:e})})).catch((function(e){return console.error("Error while retrieving coordinates",e)}))},n.changeMarkerCoord=function(e,t){var a=Object(c.a)(n.state.polyCoords),o=a.indexOf(e.position);console.log(o),-1!==o&&(a.splice(o,1,t.latLng),n.setState({polyCoords:a}))},n.placeMarker=function(e){return o.a.createElement(m.Marker,{draggable:!0,icon:h.a,position:e,onDragend:function(e,t,a){return n.changeMarkerCoord(e,a)}})},n.placeNewMarker=function(e,t,a){console.log("Clicked coordinate: ",a.latLng.lat(),a.latLng.lng());var o=a.latLng;n.setState((function(e){return{polyCoords:e.polyCoords.concat(o)}}))},n.placePolyMarkers=function(){return n.state.polyCoords.map((function(e){return n.placeMarker(e)}))},n.calcNominalPower=function(){var e=n.props.google.maps.geometry.spherical.computeArea(n.state.polyCoords);return(1e3*e/1e6).toFixed(0===e?0:4)},n.clearPolyCoords=function(){n.setState({polyCoords:[]})},n.state={currentCoord:{lat:null,lng:null},polyCoords:[],address:""},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"App-body"},o.a.createElement("div",{id:"searchDiv"},o.a.createElement(f,{address:this.state.address,handleChange:this.handleChange,handleSelect:this.handleSelect})),o.a.createElement(m.Map,{className:"map",centerAroundCurrentLocation:!0,center:this.state.currentCoord,google:this.props.google,onReady:this.fetchPlaces,onClick:this.placeNewMarker,zoom:14,style:v},this.placePolyMarkers(),o.a.createElement(m.Polygon,{paths:this.state.polyCoords,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2})),o.a.createElement("div",{id:"footer"},o.a.createElement("p",{id:"areaNumber"},"Nominal Power: ",this.calcNominalPower()," MW"),o.a.createElement("button",{id:"clearMarkerButton",onClick:this.clearPolyCoords},"Clear Map"))))}}]),t}(o.a.Component),y=Object(m.GoogleApiWrapper)({apiKey:"AIzaSyDXskD5g6vYi0fXZAeBj4cCHPEU7nPartU",libraries:["geometry","places"]})(k);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,n){}},[[17,1,2]]]);
//# sourceMappingURL=main.6adcbc6b.chunk.js.map