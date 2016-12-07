$(document).ready(function(){
    /*---------------------------------
        Tooltips for Flot Charts
    ---------------------------------*/
    if ($(".flot-chart")[0]) {
        $(".flot-chart").bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);
                $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
            }
            else {
                $(".flot-tooltip").hide();
            }
        });
        
        $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
    }
	
	
	
	/* Bar Chart - Example 1 */
	/*-----------------------*/
    var data1 = [[1,60], [2,30], [3,50], [4,100], [5,10], [6,90], [7,85]];
    var data2 = [[1,20], [2,90], [3,60], [4,40], [5,100], [6,25], [7,65]];
    var data3 = [[1,100], [2,20], [3,60], [4,90], [5,80], [6,10], [7,5]];
    
    var barData = new Array();

    barData.push({
		data : data1,
		label: 'Americas',
		bars : {
				show : true,
				barWidth : 0.18,
				order : 1,
				lineWidth: 0,
				fillColor: '#6baa01'
		}
    });
    
    barData.push({
		data : data2,
		label: 'Europe',
		bars : {
				show : true,
				barWidth : 0.18,
				order : 2,
				lineWidth: 0,
				fillColor: '#33bdda'
		}
    });
    
    barData.push({
		data : data3,
		label: 'Asia',
		bars : {
				show : true,
				barWidth : 0.18,
				order : 3,
				lineWidth: 0,
				fillColor: '#008ee4'
		}
    });

    /* Draw Chart */
    if ($('#bar-chart')[0]) {
        $.plot($("#bar-chart"), barData, {
            grid : {
                    borderWidth: 1,
                    borderColor: '#eee',
                    show : true,
                    hoverable : true,
                    clickable : true
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
            
            xaxis: {
                tickColor: '#fff',
                tickDecimals: 0,
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "#9f9f9f"
                },
                shadowSize: 0,
            },
    
            legend:{
                container: '.flc-bar-1',
                backgroundOpacity: 0.5,
                noColumns: 0,
                backgroundColor: "white",
                lineWidth: 0
            },
			colors: ["#6baa01", "#33bdda", "#008ee4"]
        });
    }	
	
	/* Bar Chart - Example 3 */
	/*-----------------------*/
	var data31 = [[1,90], [2,60], [3,50], [4,120], [5,30], [6,90], [7,85]];
    var data32 = [[1,20], [2,90], [3,60], [4,40], [5,100], [6,25], [7,65]];
	
	var barData3 = new Array();

    barData3.push({
            data : data31,
            label: 'Americas',
            bars : {
                    show : true,
                    barWidth : 0.25,
                    order : 1,
                    lineWidth: 0,
                    fillColor: '#6baa01'
            }
    });
    
    barData3.push({
            data : data32,
            label: 'Europe',
            bars : {
                    show : true,
                    barWidth : 0.25,
                    order : 2,
                    lineWidth: 0,
                    fillColor: '#33bdda'
            }
    });
	
	if ($('#bar-chart-3')[0]) {
        $.plot($("#bar-chart-3"), barData3, {
            grid : {
                    borderWidth: 1,
                    borderColor: '#eee',
                    show : true,
                    hoverable : true,
                    clickable : true
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
            
            xaxis: {
                tickColor: '#fff',
                tickDecimals: 0,
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "#9f9f9f"
                },
                shadowSize: 0,
            },
            legend:{
                container: '.flc-bar-3',
                backgroundOpacity: 0.5,
                noColumns: 0,
                backgroundColor: "white",
                lineWidth: 0
            },
        });
    }
	
});