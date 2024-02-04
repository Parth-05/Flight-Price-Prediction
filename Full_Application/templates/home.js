// function getBathValue() {
//     var uiBathrooms = document.getElementsByName("uiBathrooms");
//     for(var i in uiBathrooms) {
//       if(uiBathrooms[i].checked) {
//           return parseInt(i)+1;
//       }
//     }
//     return -1; // Invalid Value
//   }
  
//   function getBHKValue() {
//     var uiBHK = document.getElementsByName("uiBHK");
//     for(var i in uiBHK) {
//       if(uiBHK[i].checked) {
//           return parseInt(i)+1;
//       }
//     }
//     return -1; // Invalid Value
//   }
  
//   function onClickedEstimatePrice() {
//     console.log("Estimate price button clicked");
//     var total_stops = document.getElementById("total_stops");
//     var journey_date = document.getElementById("journey_date");
//     var journey_month = document.getElementById("journey_month");

//     var dep_hr = document.getElementById("dep_hr");
//     var dep_min = document.getElementById("dep_min");
//     var arr_hr = document.getElementById("arr_hr");
//     var arr_min = document.getElementById("arr_min");
//     var dur_hr = document.getElementById("dur_hr");
//     var dur_min = document.getElementById("dur_min");

//     // var bhk = getBHKValue();
//     // var bathrooms = getBathValue();
//     var airline = document.getElementById("airline");
//     var source = document.getElementById("source");
//     var destination = document.getElementById("destination");
//     // var estPrice = document.getElementById("uiEstimatedPrice");
  
//     var url = "http://127.0.0.1:5000/predictdata"; //Use this if you are NOT using nginx which is first 7 tutorials
//     // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
//     $.post(url, {
//         airline: airline.value,
//         total_stops: total_stops.value,
//         journey_date: journey_date.value,
//         journey_month: journey_month.value,
//         dep_hr: dep_hr.value,
//         dep_min: dep_min.value,
//         arr_hr: arr_hr.value,
//         arr_min: arr_min.value,
//         dur_hr: dur_hr.value,
//         dur_min: dur_min.value,
//         source: source.value,
//         destination: destination.value
//     },function(data, status) {
//         console.log(data.estimated_price);
//         estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
//         console.log(status);
//     });
//   }
  
// //   function onPageLoad() {
// //     // console.log( "document loaded" );
// //     var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
// //     // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
// //     $.get(url,function(data, status) {
// //         console.log("got response for get_location_names request");
// //         if(data) {
// //             var locations = data.locations;
// //             var uiLocations = document.getElementById("uiLocations");
// //             $('#uiLocations').empty();
// //             for(var i in locations) {
// //                 var opt = new Option(locations[i]);
// //                 $('#uiLocations').append(opt);
// //             }
// //         }
// //     });
// //   }
  
// //   window.onload = onPageLoad;