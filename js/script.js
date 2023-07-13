$(document).ready(function () {

	
	
	var pword = /[a-zA-Z_][\w \= \+ \- \* \/]+/;
	var pout = /^(out [^\d]\w*)/;
	var pin = /^(in [^\d]\w*)/;
	var pv = /[^\d]\w*/;
	var comp = "";
	var lex = "";
	var tokens = "";
	var f = false;
	var l = "";
	var tdata = "";
	


	$('#run').click(function () {
		var v = Array();
		var lines = $('#text').val().split('\n');
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].length > 0) {

				// check for in 
				if (pin.test(lines[i])) {
					var tv = /[^in ](\w*)/.exec(lines[i]);
					v[tv[0]] = prompt('enter value for "' + tv[0] + '" variable');
					console.log(tv[0]+"Var")
				}
				//check for out
				else if (pout.test(lines[i])) {
					var tv = /[^out ](\w*)/.exec(lines[i]);
					if (v[tv[0]] != null) {
						alert(v[tv[0]]);
					} else {
						alert('variable "' + tv[0] + '" undefined!');
					}
				} else if (pword.test(lines[i])) {
					lines[i] = lines[i].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
					var s = lines[i].split(" ");
					if (s.length == 3 && s[1] == "=") {
						v[s[0]] = s[2];
					} else if (s.length == 5 && s[1] == "=") {

						if (pv.test(s[2])) {
							if (v[s[2]] != null) {
								s[2] = v[s[2]];
								console.log(v)
							} else {
								alert("variable '" + s[2] + "' is undefined!");
							}
						}
						if (pv.test(s[4])) {
							if (v[s[4]] != null) {
								s[4] = v[s[4]];
								console.log(s)
							} else {
								alert("variable '" + s[4] + "' is undefined!");
							}
						}
						if (s[3] == "+") {
							v[s[0]] = parseFloat(s[2]) + parseFloat(s[4]);
						} else if (s[3] == "-") {
							v[s[0]] = parseFloat(s[2]) - parseFloat(s[4]);
						} else if (s[3] == "*") {
							v[s[0]] = parseFloat(s[2]) * parseFloat(s[4]);
						} else if (s[3] == "/") {
							v[s[0]] = parseFloat(s[2]) / parseFloat(s[4]);
						}
					}
				} else {
					alert("line: " + i + " has an error");
				}
			}
		}
	});
	$('#com').click(function () {
		$("#lex").html('')
		$("#tok").html('')
		$("#data").html('')
		tdata = ''
		lex = ''
		tokens = ''
		
		var v = Array();
		comp = "";
		f = false;
		let table = {}
		var lines = $('#text').val().split('\n');
		for (var i = 0; i < lines.length; i++) {
			
			if (f == true) {
				l = i;
				break;
			}
			if (lines[i].length > 0) {		
				
				// check for in 
				if (pin.test(lines[i])) {
					var tv = /[^in ](\w*)/.exec(lines[i]);
					table['<in>'] = 'keyword'
					table['<'+tv[0]+'>'] = 'identifier'
					console.log("Iw as here")
					v[tv[0]] = " ";
					comp += "var " + tv[0] + " = prompt('enter value for '" + tv[0] + "' variable');" + "\n";
					lex += 'in, '
					lex += (tv + ' ')
					
					
				}
				//check for out
				else if (pout.test(lines[i])) {
					var tv = /[^out ](\w*)/.exec(lines[i]);
					if (v[tv[0]] != null) {
						
						comp += "alert('" + tv[0] + "');\n";
						table['<'+'out'+'>'] = 'keyword'
						table['<'+tv[0]+'>'] = 'identifier'
						lex += 'out, '
						lex += (tv + ' ')
						
					} else {
						alert('variable "' + tv[0] + '" undefined!');
						f = true;

					}
				} else if (pword.test(lines[i])) {
					lines[i] = lines[i].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
					var s = lines[i].split(" ");
					lex += (s + ' ')					
					if (s.length == 3 && s[1] == "=") {
						v[s[0]] = " ";
						comp += "var " + s[0] + " = " + s[2] + "\n";
						table['<'+s[0]+'>'] = 'identifier'
						table['<'+s[2]+'>'] = 'constant'
						table['<=>'] = 'operator'


					} else if (s.length == 5 && s[1] == "=") {
						if (v[s[0]] == null) {
							comp += "var "
							
						}
						//console.log(comp);
						//console.log(v)
						
						v[s[0]] = " ";
						if (pv.test(s[2])) {
							if (v[s[2]] != null) {0
								console.log(pv)
								table['<'+s[2]+'>'] = 'identifier'
							} else {
								alert("variable '" + s[2] + "' is undefined!");
								f = true;
								break;
							}
						}
						if (pv.test(s[4])) {
							if (v[s[4]] = null) {
								
								alert("variable '" + s[4] + "' is undefined!");
								f = true;
								break;
							}
						}
						table["<"+s[4]+">"] = 'constant';
						table["<"+s[0]+">"] = 'identifier';
						if (s[3] == "+") {
							comp += s[0] + " = " + s[2] + " + " + s[4] + "\n";
							table["<"+s[0]+">"] = 'identifier';
							table["<"+s[2]+'>'] = 'identifier';
							table["<"+s[3]+">"] = 'attribute';
						} else if (s[3] == "-") {
							comp += s[0] + " = " + s[2] + " - " + s[4] + "\n";
							table["<"+s[3]+">"] = 'attribute';
						} else if (s[3] == "*") {
							comp += s[0] + " = " + s[2] + " * " + s[4] + "\n";
							table["<"+s[3]+">"] = 'attribute';
						} else if (s[3] == "/") {
							comp += s[0] + " = " + s[2] + " / " + s[4] + "\n";
							table["<"+s[3]+">"] = 'attribute';
						}
						table["<"+s[4]+">"] = 'constant';
						//console.log("this is s")
						//console.log(table)
						
					
						
						
						
						


}				
				} else {
					alert("line: " + i + " has an error");
				}
			}
		
		
		
		
		
		
			// lex += "\n"
		}
		if (f == true) {
			alert("we have error");
			$("#out").html("we have error");
		} else {

			for (const [key, value] of Object.entries(table)) {
				tokens+=(`${key}: ${value}`+"\n");}

			$("#out").html(comp);
			$("#lex").html(lex)
			$("#tok").html(tokens)
			//console.log(tokens+"We are tokens")
		//	console.log(lex)


		// 	var splitiedLex = lex.split(',')
		// 	for(i = 0; i<table.length; i++){

		// 		if((splitiedLex[i]=='+')&&(splitiedLex[i]=='-')&&(splitiedLex[i]=='/')&&(splitiedLex[i]=='*')){

		// 		tdata = tdata + '<tr> <td>operator</td>';
		// 		tdata = tdata + '<td>'+splitiedLex[i]+'</td></tr>';
		// 		}

		// 		else if(splitiedLex[i]=='in'){

		// 		tdata = tdata + '<tr> <td>keyword</td>';
		// 		tdata = tdata + '<td>'+splitiedLex[i]+'</td></tr>';}

				
		// 		
		// }

		for (const [key, value] of Object.entries(table)) {
			
			tdata = tdata + `<tr><td>${value}</td> <td>${key.slice(1,key.length-1)}</td>`;
			
		}
		
		$("#data").html(tdata)
		//console.log($('#data').html())
		//console.log(tdata)
			
			
		}
	});
});