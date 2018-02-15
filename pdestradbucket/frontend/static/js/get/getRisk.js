const riskFields = new Vue({
	el: '#riskFields-container',
	delimiters: ['[[', ']]'],
	data: {
		riskName: "",
		basics: [],
		enums: []
	},
	created() {
		fetch('https://1xdga6iv1c.execute-api.us-east-1.amazonaws.com/test/api/all')
		.then(response => response.json())
		.then(json => {
			this.riskName = json[0].name
			this.basics = json[0].basics
			this.enums = json[0].enums
		})
	}
})
const risks = new Vue({
	el: '#riskModelSelector-container',
	delimiters: ['[[', ']]'],
	data: {
		risks: []
	},
	created() {
		fetch('https://1xdga6iv1c.execute-api.us-east-1.amazonaws.com/test/api/all')
		.then(response => response.json())
		.then(json => {
			this.risks = json
		})
		
	},
	methods: {
		getRisk: function (id) {
			fetch('https://1xdga6iv1c.execute-api.us-east-1.amazonaws.com/test/api/' + id)
			.then(response => response.json())
			.then(json => {
				riskFields.riskName = json.name
				riskFields.basics = json.basics
				riskFields.enums = json.enums
			})
		}
	}
})