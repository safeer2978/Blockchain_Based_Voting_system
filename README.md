# Electronic Voting System using Blockchain and Smart Contracts

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)]()

Traditional elections satisfy neither citizens nor political authorities in recent years. They are not fully secure since it is easy to attack votes. It also threatens privacy and transparency of voters. Additionally, it takes too much time to count the votes. 

We propose a Blockchain based solution for solving various problems faced in the voting process. This project is a simple attemmpt to design and build an electronic voting system; where we make use of *Solidity Smart Contracts* to create a decentralized voting application (DApp). 


Our implementation consists of a web interface to allow user to interact with the blockchain, rest api to handle required records of data. For a private blockchain, we've used go-based Ethereum implementation-[geth]().

This project is inspired by [this paper](https://skemman.is/bitstream/1946/31161/1/Research-Paper-BBEVS.pdf). 

## System Design

At a very high level, a simple voting system comprises of an organising authority, a voting machine and a vote.
In case of our system, we add an etherium based blockchain, which establishes the network between the three mentioned entities.

![network_image](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/abstract.png)

Ultimatley our project converges to a Decentralised Web application(). The components of this application are:-

3. Smart Contracts
2. Front-end Software for Election Commision (ECI) and for Voting Machine
4. Voter Authentication Service

![architecture image](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/architecture.png)
### Smart Contracts

 The system includes two Smart contract:
1. Ballot smart contract.
 the Ballot smart contract is where the votes are recorded. Each district or constituency would have a Ballot instance deployed on the blockchain; and it consists a list of candidate data for respective district. The Ballot consist of a vote function which can be called by the client to increment vote count of a candidate. Since this function changes the state of the contract, it is function is payable, and thus recorded on the blockchain. Each ballot has a time parameter which specifies the duration till which the vote function would be valid. This contract will be accessed by the voting machine for voting and the ECI portal for monitoring and counting process.  

2. Election creation smart contract.
 the election creation smart contract is what is used to deploy the ballots on the blockchain. Only the ECI representative, operating the ECI portal client can connect to this contract. This contract takes input as the database of all candidates of respective districts and deploys ballots for every district onto the blockchain. This contract also has a function which returns the addresses of the deployed ballots, so they can be used by the voting machines later.

![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/sm1.png)![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/sm2.png)

### Web clients
There are two web clients in this project viz the ECI portal and the voting machine. Both of these clients require communication using both http and rpc protocols, hence make use of api/libraries such as XMLHttpRequest and web3.js

1. ECI portal.

The ECI portal has several functions. First, it has to register eligible voters. For this, a table consisting of required voter data is created using this functionality. this data includes a hash of voter id and fingerprint and the voters' district. For each registered voter, this data is collected and maintained in a database.
Secondly, to create a database of candidates of respective districts, another functionality is added. This would create a table of candidate data which will be used to load the ballots later.
Third, this portal allows the ECI official to start the election, by specifying the candidates and the time duration. This would make use of election creation smart which would intern deploy the Ballots. The Addresses of these deployed ballots are maintained in a separate table for future use.
Lastly, the portal makes use the address stored in table, to access the ballots to monitor the votes; thereby declare the winner of the election.

2. The Voting machine interface.

The voting machine interface would first verify the voters' eligibility. For this, the machine would input the voter id and fingerprint signature from the voter. This data is hashed and compared with the voter database for authentication. Eligible voters are given access to the ballot, where the can cast their vote. The interface is simple and provides instructions in several languages. The interaction with the ballot is done by using web3 ipc protocol which would connect to the node on the machine. The web app interacts with the ballot smart contract using web3js and thus sends vote as a transaction.

### Voter Authentication Service

All database interactions are built on a REST api built using NodeJS application. 
This api interacts with clients and a mysql server hosted online. 

The database maintains 3 tables viz, candidate data, voter data and contract addresses.

### Blockchain

The blockchain is established using the geth program. Geth is the go-based implementation of Ethereum protocol. We create a private p2p network of all voting machines, miners and eci portal. We created our own genesis description which would be needed to connect to our network. 


## Screen Shots:

### Voter Interface

![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/1.jpg)
![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/2.jpg)
![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/3.jpg)

### Election Commision Interface
![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/11.jpg)
![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/12.jpg)
![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/13.jpg)
![alt text](https://github.com/safeer2978/Blockchain_Based_Voting_system/blob/master/Diagrams/14.jpg)
