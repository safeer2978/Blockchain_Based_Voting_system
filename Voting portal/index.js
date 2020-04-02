(() => {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const interface = JSON.parse(YOUR_CONTRACT_INTERFACE);
    const VotingContract = web3.eth.contract(interface);
    const contractInstance = VotingContract.at(YOUR_CONTRACT_ADDRESS);
    
    // Default account is used if you don't specify from in function call.
    //web3.eth.defaultAccount = web3.eth.accounts[0];
    web3.personal.unlockAccount(web3.eth.accounts[0], YOUR_NODE_PASSWORD, 0);
    
    const tableElem = document.getElementById("table-body");
    const candidateOptions = document.getElementById("candidate-options");
    const voteForm = document.getElementById("vote-form");
    
    function handleVoteForCandidate(evt) {
      const candidate = new FormData(evt.target).get("candidate");
      contractInstance.voteForCandidate(candidate, {from: web3.eth.accounts[0]}, function() {
        const votes = contractInstance.totalVotesFor.call(candidate);
    
        // Updates the vote element.
        document.getElementById("vote-" + candidate).innerText = votes;
      });
    }
    
    voteForm.addEventListener("submit", handleVoteForCandidate, false);
    
    function populateCandidates() {
      const candidateList = contractInstance.getCandidateList.call(); // call() is used for sync read only calls.
      candidateList.forEach((candidate) => {
        const candidateName = web3.toUtf8(candidate);
        const votes = contractInstance.totalVotesFor.call(candidate);
        
        // Creates a row element.
        const rowElem = document.createElement("tr");
    
        // Creates a cell element for the name.
        const nameCell = document.createElement("td");
        nameCell.innerText = candidateName;
        rowElem.appendChild(nameCell);
    
        // Creates a cell element for the votes.
        const voteCell = document.createElement("td");
        voteCell.id = "vote-" + candidate; 
        voteCell.innerText = votes;
        rowElem.appendChild(voteCell);
    
        // Adds the new row to the voting table.
        tableElem.appendChild(rowElem);
    
        // Creates an option for each candidate
        const candidateOption = document.createElement("option");
        candidateOption.value = candidate;
        candidateOption.innerText = candidateName;
        candidateOptions.appendChild(candidateOption);
      });
    }
    
    populateCandidates();
    })();