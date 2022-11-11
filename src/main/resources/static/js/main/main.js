function getBirthDash() {
    fetch('/main/getBirthDash').then(response => {
        if(response.ok) {
            return response.json();
        }
    }).then(json => {

        let instantDate = new Date();
        let month = instantDate.getMonth() + 1;
        let titleHtml = `${month}월 생일자`;

        let dashHtml = '';
        if (!json) {
            dashHtml = '-';
        } else if (json.length > 2){ // 당월 생일자가 3명 이상이라면 아무개 외 N명 <- 으로 노출되도록 처리
            dashHtml = `${json[0]}외 ${json.length - 1}명`;
        } else {
            dashHtml = `${json}`;

        }

        $("#birthDash").empty().append(dashHtml);
        $("#birthTitle").empty().append(titleHtml);
    })
}



//결재 대기 현황
function getExpreportDash() {

    fetch('/main/getExpreportDash').then(response => {

        if(response.ok) {
            return response.json();
        }
    }).then(json => {
        let html = '';
        if(!json) {
            html = '모두 완료!';
        } else {
            html = `${json}건`;
        }

        $("#expreportDash").empty().append(html);
    })
}


//전체 직원 수 현황
function getEmpDash() {

    fetch('/main/getEmpDash').then(response => {

        if(response.ok) {
            return response.json();
        }
    }).then(json => {
        let html = '';

        html = `${json}명`;

        $("#empDash").empty().append(html);
    })
}


//당월 입사자 현황
function getHireDash() {

    fetch('/main/getHireDash').then(response => {

        if(response.ok) {
            return response.json();
        }
    }).then(json => {
        let html = '';
        if(!json) {
            html = '0명';
        } else {
            html = `${json}명`;
        }

        $("#hireDash").empty().append(html);
    })
}



//휴가자 현황
function getCalInfo() {

    $(function () {
        var request = $.ajax({
            url: "/main/getCalAll",
            method: "GET",
            dataType: "json"
        });

        request.done(function (data) {
            console.log(data);

            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {

                headerToolbar: {
                    left: 'today',
                    center: 'title',
                    right: 'prev next'
                },
                initialView: 'dayGridMonth',
                locale: "ko",
                dayMaxEvents: true,
                events: data,
                contentHeight: 500


            });

            calendar.render();

        })

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

    });
}

//공지사항 대시
function getNoticeDash() {

    fetch('/main/getNoticeDash').then(response => {

        if(response.ok) {
            return response.json();
        }
    }).then(json => {
        let html = '';
        if(!json.length) {
            html = '<td colspan="3">등록된 공지사항이 없습니다.</td>';
        } else {
            json.forEach((obj) => {

                var num = obj.ntcNum;

                html += `
                <tr style="cursor:pointer;" onclick="location.href='http://localhost:8080/info/viewinfo?ntcNum='+${num}" onmouseover="this.style.background='whitesmoke'" onmouseout="this.style.background='white'" >
                    <td>${num}</td>
                    <td align="left">${obj.title}</td>
                    <td>${obj.date}</td>
                </tr>
            `;
            })
        }

        $("#noticeDash").empty().append(html);
    })
}


window.onload = () => {

    getCalInfo();
    getHireDash();
    getEmpDash();
    getExpreportDash();
    getNoticeDash();
    getBirthDash();
}