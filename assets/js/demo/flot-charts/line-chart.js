$(document).ready(function(){
	var d1 = [[0,30],[1,35],[2,35],[3,30],[4,30],[5,35],[6,32],[7,37],[8,30],[9,35],[10,30],[11,31]];
    var d2 = [[0,50],[1,40],[2,45],[3,60],[4,50],[5,50],[6,60],[7,55],[8,50],[9,50],[10,60],[11,35]];
    var d3 = [[0,40],[1,50],[2,35],[3,25],[4,40],[5,45],[6,55],[7,50],[8,35],[9,40],[10,48],[11,40]];

    /*---------------------------------------------------
        Make some random data for Recent Items chart
    ---------------------------------------------------*/
    var data = [];
    var totalPoints = 100;
    var updateInterval = 30;
    
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        while (data.length < totalPoints) {
    
            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            } else if (y > 90) {
                y = 90;
            }

            data.push(y);
        }

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    /*---------------------------------------------------
        Make some random data for Flot Line Chart
    ---------------------------------------------------*/
    
    /*var d1 = [];
    for (var i = 0; i <= 10; i += 1) {
        d1.push([i, parseInt(Math.random() * 30)]);
    }
    var d2 = [];
    for (var i = 0; i <= 20; i += 1) {
        d2.push([i, parseInt(Math.random() * 30)]);
    }    
    var d3 = [];
    for (var i = 0; i <= 10; i += 1) {
        d3.push([i, parseInt(Math.random() * 30)]);
    }*/

    /*---------------------------------
        Chart Options
    ---------------------------------*/
    var options = {
        series: {
            shadowSize: 0,
            lines: {
                show: true,
            },
        },
        grid: {
            borderWidth: 1,
            labelMargin:10,
			mouseActiveRadius:6,
            borderColor: '#eee',
            show : true,
            hoverable : true,
            clickable : true
            
        },
        xaxis: {
            tickColor: '#fff',
            tickDecimals: 0,
            font :{
                lineHeight: 13,
                style: "normal",
                color: "#9f9f9f"
            },
            shadowSize: 0,
            ticks: [[0,"Jan"], [1,"Feb"], [2,"Mar"], [3,"Apr"], [4,"May"], [5,"Jun"], [6,"Jul"], [7,"Aug"], [8,"Sep"], [9,"Oct"], [10,"Nov"], [11,"Dec"]]
        },
        
        yaxis: {
            tickColor: '#eee',
            tickDecimals: 0,
            font :{
                lineHeight: 13,
                style: "normal",
                color: "#9f9f9f",
            },
            shadowSize: 0
        },
        
        legend: {
            container: '.flc-line',
            backgroundOpacity: 0.5,
            noColumns: 0,
            backgroundColor: "white",
            lineWidth: 0
        },
        colors: ["#6baa01", "#33bdda", "#008ee4"]
    };

    /*---------------------------------
        Regular Line Chart
    ---------------------------------*/
    if ($("#line-chart")[0]) {
        $.plot($("#line-chart"), [
			{data: d1, lines: { show: true  }, label: 'Product A', stack: true, color: '#F9D900' },
            {data: d2, lines: { show: true }, label: 'Product B', stack: true, color: '#A9E200' },
            {data: d3, lines: { show: true }, label: 'Product C', stack: true, color: '#22BAD9' }
        ], options);
    }


    /*---------------------------------
        Recent Items Table Chart
    ---------------------------------*/
    if ($("#recent-items-chart")[0]) {
        $.plot($("#recent-items-chart"), [
            {data: getRandomData(), lines: { show: true, fill: 0.8 }, label: 'Items', stack: true, color: '#00BCD4' },
        ], options);
    }


    /*---------------------------------
        Tooltips for Flot Charts
    ---------------------------------*/
    if ($(".flot-chart-line")[0]) {
        $(".flot-chart-line").bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
				$(".flot-tooltip").html(item.series.label + " Sales " + " : " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
            }
            else {
                $(".flot-tooltip").hide();
            }
        });
        
        $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
    }
	
	
	
	/*-------------------------------
		Widget Charts
	--------------------------------*/
	/*if ($("#line-chart-w1")[0]) {
        $.plot($("#line-chart-w1"), [
			{data: d1, lines: { show: true  }, label: 'Product A', stack: true, color: '#F9D900' },
            {data: d2, lines: { show: true }, label: 'Product B', stack: true, color: '#A9E200' },
            {data: d3, lines: { show: true }, label: 'Product C', stack: true, color: '#22BAD9' }
        ], options);
    }*/
});