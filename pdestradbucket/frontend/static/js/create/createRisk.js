const fields = new Vue({
	el: "#fields-container",
	data: {
		name: '',
		empty: '',
		fields: []
	},
	methods: {
		addField: function() {
			this.fields.push(
				new Vue({
					data : {
						attrName: '',
						dataType: '',
						options: [],
						empty: ''
					}
				})
			)
		},
		addOption: function(field) {
			field.options.push(
				new Vue({
					data : {
						option: '',
						empty: ''
					}
				})
			)
		},
		deleteField: function(field) {
			var index = this.fields.indexOf(field)
			this.fields.splice(index,1)
		},
		deleteOption: function(field, option) {
			var index = this.fields.indexOf(field)
			var optionIndex = this.fields[index].options.indexOf(option)
			this.fields[index].options.splice(optionIndex,1)
		},
		checkEmptyField: function() {
			var error = ""
			var empty = false
			if (this.name == "") {
				this.empty = "empty"
				empty = true
			} else {
				this.empty = ""
			}
			if (this.fields.length > 0) {
				for (i in this.fields) {
					if (this.fields[i].attrName == '') {
						this.fields[i].empty = "empty"
						empty = true
					} else if (this.fields[i].dataType == '') {
						error = "You must select a data type."
						empty = true
					} else {
						this.fields[i].empty = ""
					}
					if (this.fields[i].options.length > 0) {
						for (j in this.fields[i].options) {
							if (this.fields[i].options[j].option == "") {
								this.fields[i].options[j].empty = "empty"
								empty = true
							} else {
								this.fields[i].options[j].empty = ""
							}
						}
					} else {
						if (this.fields[i].dataType == "enum") {
							error = "You must add least one option to create a Enum data type."
							empty = true
						}
					}
				}
			} else {
				error = "You must add least one field."
				empty = true
			}
			if (error != "") {alert(error)}
			return empty
		},
		clearInputs: function() {
			this.name = ""
			this.fields = []
		},
		createPostData: function() {
			var postData = {"name" : this.name}
			var basics = []
			var enums = []
			for (i in this.fields) {
				if (this.fields[i].dataType == "enum") {
					var enumData = {"attrName" : this.fields[i].attrName}
					if (this.fields[i].options.length > 0) {
						var options = []
						for (j in this.fields[i].options) {
							options.push({
								"option" : this.fields[i].options[j].option
							})
						}
						enumData["options"] = options
					}
					enums.push(enumData)
				} else {
					var basicsData = {
						"attrName" : this.fields[i].attrName,
						"dataType" : this.fields[i].dataType
					}
					basics.push(basicsData)
				}
			}
			if (basics.length > 0) {postData["basics"] = basics}
			if (enums.length > 0) {postData["enums"] = enums}

			return postData
		},
		createField: function() {
			if (!this.checkEmptyField()) {
				$.ajax({
			        url:'api/create',
			        type:'POST',
			        dataType:'json',
			        data:this.createPostData(),
			        success:function(data){
			        	if (!data["error"]) {
			        		fields.clearInputs()
			        		alert("Risk Model successfully created!.")
			        	} else {
			        		alert("Error creating Risk Model :(")
			        	}
			        },
			        error:function(data){
			            alert("Error creating Risk Model :(")
			        }
			    })
			}
				
		}

	}
})









