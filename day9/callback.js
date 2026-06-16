// function fetchData(callback) {
//   const data = { id: 1, message: 'Hello from callback' };
//   setTimeout(() => {
//     callback(data);
//   }, 1000);
// }

// function displayData(result) {
//   console.log('Callback result:', result);
// }

// fetchData(displayData);

function orderPizza(size){
    console.log(`Ordering a ${size} pizza...`);
}
function payForPizza(callback){
    console.log('Processing payment...');
    callback('Large');
}
payForPizza(orderPizza);


//getusernamev ->username and uid address
//getuserorderhistory   print 4 orders-laptop,mobile,grrocery,books
// //createuserdashboard  username,uid,order,history data


function getUserdetails(callback){
     console.log('Fetching user details...');
     const user = { username: 'john_doe', uid: 123, address: '123 Main St' };
     callback(user);
}

function getUserOrderHistory(callback){
        console.log('Fetching user order history...');
        const orders = ['Laptop', 'Mobile', 'Grocery', 'Books'];
        console.log("user name and uid:",user.username,user.uid);
        console.log("user order history:",orders);
        callback(orders);
}
function createUserDashboard(){
        getUserdetails(getUserOrderHistory);
      console.log("Creating user dashboard...");
    console.log("user name and uid:",user.username,user.uid);
        console.log("user order history:",orders);
}
let use1=getUserOrderHistory(createUserDashboard);
getUserdetails(use1);

//fun1
//fun2
//fun3callback(both fun1 and fun2)
