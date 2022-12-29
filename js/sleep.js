   function sleep(milliseconds) {  
      return new Promise(resolve => setTimeout(resolve, milliseconds));  
   }  
   async function fun() {  
    while(true){
      console.log('Hello World');           
         await sleep(2000);  }

   }  
   fun();  