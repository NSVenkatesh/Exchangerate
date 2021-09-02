$(document).ready(function () {
  var url ="http://api.exchangeratesapi.io/v1/latest?access_key=54d352517d8ae4ba89b534ae260e465a";
  $.ajax({
    dataType: "json",
    url: url,
    success: function (json) {
      console.log(json.rates);
      Apivalue = json;
      setOptions();
      $("#btn").click(function () {
        mainfunction();
      });
      $("#input").keyup(function () {
        mainfunction();
      });
      $(".swap_icon").click(function () {
        swap();
        mainfunction();
      });
    },
  });
});

function setOptions() {
  for (i in Apivalue.rates) {
    var option = "<option class='options' value=" + i + ">";
    $("datalist").append(option);
  }
}

function mainfunction() {
  $("#unitreverse").hide();
  $("#To_currency,#From_currency").css("border-color", "gray");
  $("#To_wrong,#From_wrong").html("some value").css("opacity", "0");
  var From = $("#From_currency").val().toUpperCase();
  var To = $("#To_currency").val().toUpperCase();
  var input = $("#input").val();
  if ((From, To == "")) {
    alert("Please Choose Currency values");
    return false;
  }
  if (Apivalue.rates[From] == undefined || Apivalue.rates[To] == undefined) {
    if (Apivalue.rates[From] == undefined) {
      $("#From_currency").css("border-color", "red");
      $("#From_wrong")
        .html(From + " is not a currency type")
        .css("opacity", "1");
    }
    if (Apivalue.rates[To] == undefined) {
      $("#To_currency").css("border-color", "red");
      $("#To_wrong")
        .html(To + " is not a currency type")
        .css("opacity", "1");
    }
    return false;
  }
  converter(From, To, input);
}

function converter(From, To, input) {
  var Fromvalue = Apivalue.rates[From];
  var Tovalue = Apivalue.rates[To];
  conversion(Fromvalue, Tovalue, input, From, To);
}

function conversion(Fromvalue, Tovalue, input, From, To) {
  basevalue = Apivalue.rates.EUR;
  Fromvaluecorrected = basevalue / Fromvalue;
  unitresult = Tovalue * Fromvaluecorrected;
  Tovaluecorrected = basevalue / Tovalue;
  unitreverse = Fromvalue * Tovaluecorrected;
  resultvalue = Tovalue * Fromvaluecorrected * input;
  $("#inputvalue").html(input + " " + From + " = ");
  $("#result").html(resultvalue.toFixed(4) + " " + To);
  if (input != 1) {
    $("#unitreverse")
      .html("1 " + From + " = " + unitresult.toFixed(4) + " " + To)
      .show();
  }
  $("#unit").html("1 " + To + " = " + unitreverse.toFixed(4) + " " + From);
}

function swap() {
  val1 = $("#From_currency").val();
  val2 = $("#To_currency").val();
  $("#From_currency").val(val2);
  $("#To_currency").val(val1);
}
