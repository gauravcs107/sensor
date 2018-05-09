	let sensorIDs = [];
	let timestamp = [];
	let measure = [];
	let capabilityIDs = [];
	let k='';
	var tt=0;
	let sensorMap = new  Map();
	var plotly =require('plotly')("gaurav1411","kfqvVZGJ1ngPWxEAgPRq");
setInterval(hitAPI,20000)
function hitAPI() {
	// let url = document.getElementById('api_url').value;
		// console.log('hi' + url);
		let url = "https://nagarro.eu10.cp.iot.sap/iot/core/api/v1/devices/";
		let d_no = document.getElementById('d_no').value;
		url = url + d_no + '/measures';
	     capabilityIDs = [];
			  sensorIDs = [];
			  timestamp = [];
			  measure = [];
	let xhr = new XMLHttpRequest();
		console.log('a');
		console.log('aaa');



	xhr.onreadystatechange = function() {

		console.log("this is response text :"+ xhr.responseText);
		if(xhr.readyState==4)
		{
			console.log('aa');
			console.log("status"+xhr.status)

		if( xhr.status == 200) {
			console.log('aaaa');
						console.log('lol: ' + xhr.responseText);
			populateDOM(xhr.responseText, url);
		}
	}
	}
			xhr.open("GET", url, true);
		//xhr.setRequestHeader( 'Content-Type', 'application/json' );
		  xhr.setRequestHeader("Authorization", "Basic aW90cG9jOmxkMDpuUi58");

	xhr.send(null);
}


function populateDOM(jsonData, url) {

	// let jsonData =  t;

	let ele2 = document.getElementById('div2');
	let ele1 = document.getElementById('div1');

	// Extracting Device Number

	let temp =  url;
	let startIndex = url.indexOf('devices') + 8;
	temp = temp.slice(startIndex);
	let endIndex = temp.indexOf('/');
	let device_no = temp.slice(0, endIndex);

	// Extracting data

	let data = JSON.parse(jsonData);
	for(var i in data) {
		sensorIDs.push(data[i].sensorId);
		timestamp.push(data[i].timestamp);
		measure.push(JSON.stringify(data[i].measure));
		capabilityIDs.push(data[i].capabilityId);
		var j = sensorMap.get(data[i].capabilityId);
		if(j == undefined) {
			sensorMap.set(data[i].capabilityId, new Set([data[i].sensorId]));
		}
		else {
			j.add(data[i].sensorId);
		}
	}

	// console.log(sensorMap);

	// Populating DOM

	


	// Populating DOM Modern

	let sensorSet = new Set(sensorIDs);
	let capabilitySet = new  Set(capabilityIDs);

	let str = "";

	let itrSensor = sensorSet.values();
	let itrCap = capabilitySet.values();


	// Populating Capabilities

	let htmlStr3 = "";
	htmlStr3 += "<table class='highlight'><thead>";

	for(var i = 0; i<capabilitySet.size; i++) {
		let temp3 = itrCap.next().value;
		htmlStr3 += '<th><a class="waves-effect waves-light btn" onclick="showSensors(\'' + temp3 + '\')">' + temp3 + '</a></th>'
		//setInterval(showSensors(temp3),2000)
	}
	htmlStr3 += '</thead><tbody>';


	// Populating Sensor Table

	//let htmlStr2 = "";
	//htmlStr2 += "<a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Sensors</a><ul id='dropdown1' class='dropdown-content'>";
	//for(var i = 0; i<sensorSet.size; i++) {
	//	let temp2 = itrSensor.next().value;
	//	htmlStr2 += '<li><a href="#!" class="waves-effect waves-light btn" onclick="showSensorData(\'' + temp2 + '\')">' + temp2 +  '</a></li>';
	//}
	//htmlStr2 += '</ul>';


	htmlStr3 += "</tbody></table>";

	ele2.innerHTML = htmlStr3;
	//document.getElementById('div3').innerHTML = htmlStr2;
	$('.dropdown-trigger').dropdown();
	setInterval(a,30000);
	function a(){
	if(tt==1)
	showSensors(k)}// }, 1000);}
}


function showSensorData(sensor_ID) {
	let htmlStr='';
	
	htmlStr = '<table id="t2"><tr><th>S. No.</th><th>Timestamp</th><th>Measure</th></tr>';
	for(var i = 0; i<sensorIDs.length; i++) {
		if(sensor_ID == sensorIDs[i]) {
			htmlStr += '<tr><td>' + (i+1) + '</td><td>' + timestamp[i] + '</td><td>' + measure[i] + '</td></tr>';
		}
	}
	htmlStr += '</table>';
		document.getElementById('div4').innerHTML = htmlStr;
	
	//setInterval(showSensorData(sensor_ID),2000)
	
}



function showSensors(capabilty_id) {
	k=capabilty_id;
	tt=1;
	let ele3 = document.getElementById('div5');
	var htmlReply = '';
	for(var[key, value] of sensorMap) {
		if(key == capabilty_id) {
			let set1 = sensorMap.get(key);
			let itrMap = set1.values();

			for(var i = 0; i<set1.size; i++) {
				var temp = itrMap.next().value;
				htmlReply +=showSensorData(temp)
				//htmlReply += '<a class="waves-effect waves-light btn" onclick="showSensorData(\'' + temp + '\')">' + temp + '</a>&nbsp;&nbsp;';
			}
		}
	}
	ele3.innerHTML = htmlReply;
	
}

//require('plotly')(username, api_key);

var trace1 = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  y: [8, 7, 6, 5, 4, 3, 2, 1, 0],
  type: "scatter"
};
var trace2 = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  y: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  type: "scatter"
};
var data = [trace1, trace2];
var layout = {
  xaxis: {
    type: "log",
    autorange: true
  },
  yaxis: {
    type: "log",
    autorange: true
  }
};
var graphOptions = {layout: layout, filename: "plotly-log-axes", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
function showGraph(sensor_id) {
	let ele4 = document.getElementById('div6');

	ele4.innerHTML = 'SHOWING GRAPH OF SENSOR ID: ' + sensor_id;
}














