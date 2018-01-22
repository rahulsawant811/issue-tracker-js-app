document.getElementById('myForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    const id = chance.guid();
    const description = document.getElementById('issueDesc').value;
    const riskLevel = document.getElementById('issueRiskLevel').value;
    const assignTo = document.getElementById('issueAssignedTo').value;
    const status = 'Open';

    let issue = {
        id: id,
        description: description,
        riskLevel: riskLevel,
        assignTo: assignTo,
        status: status
    }

    if(localStorage.getItem('issues') == null){
        let issueArr = [];
        issueArr.push(issue);
        localStorage.setItem('issues', JSON.stringify(issueArr));
    } else {
        let issueArr = JSON.parse(localStorage.getItem('issues'));
        issueArr.push(issue);
        localStorage.setItem('issues', JSON.stringify(issueArr));
    }

    document.getElementById('myForm').reset();

    fetchIssues();

    e.preventDefault();
}

function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issueList = document.getElementById('issueList');


    issueList.innerHTML = '';
    for(let i = 0; i < issues.length; i++){
        const id = issues[i].id;
        const description = issues[i].description;
        const riskLevel = issues[i].riskLevel;
        const assignTo = issues[i].assignTo;
        const status = issues[i].status;

        issueList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + description + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span> ' + riskLevel + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span> ' + assignTo + '</p>'+
                                '<a href="javascript:void(0);" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                '<a href="javascript:void(0);" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div>';
    }
}

function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
          issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));
    for(let i = 0; i < issues.length; i++){
        if(issues[i].id == id){
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
