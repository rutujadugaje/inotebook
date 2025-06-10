this process will be done after creating backend

***Add following line into package.json file in Debug***

```
 "both" : "concurrently \"npm run dev\" \"nodemon backend/index.js\"" 
 ```

***download following package***
```
npm i react-router-dom concurrently 
```
    
***then run this command***
```
"npm run both"
```
it allows you to run both the frontend and backend at the same time