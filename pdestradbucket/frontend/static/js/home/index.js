$("#fire").click(function () {
	$.ajax({
		type: 'POST',
		url: '/api/create',
		data: {
			"name": "car",
			"basics": [
				{
		            "dataType": "text",
		            "attrName": "model"
		        },
		        {
		            "dataType": "number",
		            "attrName": "cost"
		        },
		        {
		            "dataType": "date",
		            "attrName": "contractDate"
		        }
	        ],
	        "enums": [
		        {
		            "options": [
		                {
		                    "option": "white"
		                },
		                {
		                    "option": "red"
		                },
		                {
		                    "option": "blue"
		                }
		            ],
		            "attrName": "color"
		        },
		        {
		            "options": [
		                {
		                    "option": "sedan"
		                },
		                {
		                    "option": "SUV"
		                },
		                {
		                    "option": "PickupTruck"
		                }
		            ],
		            "attrName": "type"
		        }
		    ],
			'csrfmiddlewaretoken' : $('input[name=csrfmiddlewaretoken]').val()
		},
		dataType: 'json',
		success: citas
	});
});

function citas(data, textStatus, jqXHR) {
	console.log(data)
}