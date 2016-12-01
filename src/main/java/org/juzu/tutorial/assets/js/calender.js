		var The_Year,The_Day,The_Month;
		var today;
		var Firstday;
		today = new Date();
		The_Year = today.getFullYear();
		//alert(The_Year);
		The_Month = today.getMonth() + 1;
		//alert(The_Month);
		The_Day = today.getDate();
		//alert(The_Day);
		Firstday = GetWeekday(The_Year,The_Month);
		bf_Days = new Date(The_Year, The_Month-1, 0).getDate();
		//alert("上个月共"+bf_Days);
		//alert(Firstday);
		ShowCalender(The_Year,The_Month,The_Day,Firstday);
		function RunNian(The_Year)
		{
			if ((The_Year%400==0) || ((The_Year%4==0) && (The_Year%100!=0)))
			return true;
			else
			return false;
		}
		function GetWeekday(The_Year,The_Month)
		{
		
			var startDay = new Date(The_Year, The_Month - 1, 1).getDay();
			//var Day1 = (new Date(The_Year, The_Month - 1, 1)-1).getDay();
			//alert(Day1);
			return startDay;
		}
		function ShowCalender(The_Year,The_Month,The_Day,Firstday)
		{
			var showstr;
			var Month_Day;
			var ShowMonth;
			var today;
			var numRow = 0;
			today = new Date();
			var year = today.getFullYear();      //本年
			var month = today.getMonth() + 1;    //本月
			var day = today.getDate();           //本日
			switch (The_Month)
			{
			case 1 : ShowMonth = "January"; Month_Day = 31; break;
			case 2 :
			ShowMonth = "February";
			if (RunNian(The_Year))
			Month_Day = 29;
			else
			Month_Day = 28;
			break;
			case 3 : ShowMonth = "March"; Month_Day = 31; break;
			case 4 : ShowMonth = "April"; Month_Day = 30; break;
			case 5 : ShowMonth = "May"; Month_Day = 31; break;
			case 6 : ShowMonth = "June"; Month_Day = 30; break;
			case 7 : ShowMonth = "July"; Month_Day = 31; break;
			case 8 : ShowMonth = "August"; Month_Day = 31; break;
			case 9 : ShowMonth = "September"; Month_Day = 30; break;
			case 10 : ShowMonth = "October"; Month_Day = 31; break;
			case 11 : ShowMonth = "November"; Month_Day = 30; break;
			case 12 : ShowMonth = "December"; Month_Day = 31; break;
			
			}
			showstr = "";
			showstr = "<h5 class=\"title clearfix\">"+
					  "<span id=\"dateYM\">"+ShowMonth+", "+The_Year+"</span>"+
					  "</h5>"+
					  "<table class=\"weekList\">"+
							"<tbody>"+
								"<tr>"+
								   "<td><font color=\"red\">S</font></td>"+
								   "<td>M</td>"+
								   "<td>T</td>"+
								   "<td>W</td>"+
								   "<td>T</td>"+
								   "<td>F</td>"+
								   "<td>S</td>"+
								"</tr>"+
							"</tbody>"+
						"</table>"+
						"<hr>"+
						"<table cellspacing=\"0\" cellpadding=\"0\" class=\"weekDays\">"+
						"<tbody>";
						
			//alert(Firstday);
			if(day <= (7-Firstday))
			{
				
				showstr += "<tr class=\"currentWeek\">";
			}
			else
			{
				showstr += "<tr>";
			}
			for (i = Firstday; i >= 1; i--)
			{/**/
				showstr +="<td><a onclick=\"\" class=\"otherMonth\">"+(bf_Days-i+1)+"</a></td>";
				numRow++;
			}
			//alert(Month_Day);
			for (j=1; j<=Month_Day; j++)
			{
				//var dt = new Date(The_Year+"/"+The_Month, Month_Day).getDay());
				//alert(dt);
				if(day == j)
				{
					showstr +="<td><a onclick=\"ShowCalendar("+j+")\" class=\"highLight today\">"+j+"</a></td>";
				}
				else
				{
					if(j<10)
					{
						showstr +="<td><a onclick=\"ShowCalendar("+j+")\" class=\"\">0"+j+"</a></td>";
					}
					else
					{
						showstr +="<td><a onclick=\"ShowCalendar("+j+")\" class=\"\">"+j+"</a></td>";
					}
				}
				
				numRow++;
				if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
					numRow = 0;
					if((day <= (7+j))&&(day >= j))
					{
						showstr += "</tr><tr class=\"currentWeek\">";
					}
					else
					{
						showstr += '</tr><tr>';
					}
					
				} 
				
			}
			//alert("numRow"+numRow);
			if(numRow!=0)
			{
				var num = 7-numRow;
				for(i=1;i<=num;i++)
				{
					showstr +="<td><a onclick=\"\" class=\"otherMonth\">0"+i+"</a></td>";
					
				}
				showstr += '</tr>';
			}
			showstr += "</tbody></table>";
			showstr += "<div class=\"calendarTimeInput\">"+
							"<span>"+
								"<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setHour(this)\" value=\""+day+"\" maxlength=\"2\" class=\"InputTime\">:<input type=\"text\" onblur=\"this.parentNode.className=''\" onfocus=\"this.parentNode.className='focus'\" onkeyup=\"eXo.webui.UICalendar.setMinus(this)\" value=\"40\" maxlength=\"2\" class=\"InputTime\">"+
							"</span>"+
					"</div>";
			//alert(showstr);
			document.getElementById("cc").innerHTML = showstr;
		}