* very helpfull
``` shell
npm start
npm init -y
```

```js 
app.route('/cars').get(function(req, res) {
    Car.find({},(err, result)=>{
    if (!err){
    res.send(result);
    }else{
    console.log(err)
    res.send('Some Error')
    }
    })
})
```
