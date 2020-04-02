(() => {
    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    let abi = '[{"inputs":[{"internalType":"string[]","name":"candidateNames","type":"string[]"},{"internalType":"string[]","name":"candidateParty","type":"string[]"},{"internalType":"string","name":"district","type":"string"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"amountofHours","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"party","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"},{"internalType":"uint256","name":"creationDate","type":"uint256"},{"internalType":"uint256","name":"expirationDate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getCandidateName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCandidateNames","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getCandidateParty","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCandidatePartys","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVoteCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votingDistrict","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';
    BallotContract = new web3.eth.Contract(JSON.parse(abi),0x141ecb0bd9839d7840f56eb72d910151bb6372a8);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    //web3.personal.unlockAccount(web3.eth.accounts[0], YOUR_NODE_PASSWORD, 0);
    
    const tableElem = document.getElementById("table-body");
    const candidateOptions = document.getElementById("candidate-options");
    const voteForm = document.getElementById("vote-form");
    
    function handleVote(evt) {
      const candidate = new FormData(evt.target).get("candidate");
      BallotContract.vote(candidate, {from: web3.eth.accounts[0]}, function() {
        const votes = BallotContract.getVoteCount.call(candidate);
    
        // Updates the vote element.
        document.getElementById("vote-" + candidate).innerText = votes;
      });
    }
    
    voteForm.addEventListener("submit", handleVote, false);
    
    function populateCandidates() {
      const candidateList = BallotContract.getCandidateNames().call(); // call() is used for sync read only calls.
      candidateList.forEach((candidate) => {
        const candidateName = web3.toUtf8(candidate);
        const votes = BallotContract.getVoteCount().call(candidate);
        
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
    function populateCandidatesparty() {
      const candidateList = BallotContract.getCandidatePartys().call(); // call() is used for sync read only calls.
      candidateList.forEach((candidate) => {
        //const candidateName = web3.toUtf8(candidate);

        // Creates a row element.
        const rowElem = document.createElement("tr");
    
        // Creates a cell element for the name.
        const nameCell = document.createElement("td");
        nameCell.innerText = candidateName;
        rowElem.appendChild(nameCell);
    
    
        // Adds the new row to the voting table.
        tableElem.appendChild(rowElem);
      });
    }
    
    populateCandidates();
    populateCandidatesparty(); 
    })();