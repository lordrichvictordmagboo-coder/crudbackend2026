//SQL
//MySQL
const connection = require('../config/db');
//REPORT
exports.getAllUsers = (req, res) => {
  connection.query('SELECT * FROM userdata', (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
};
exports.getHelloWorld=(req,res)=>{
    res.send("HELLO WORLD!");
}
//REPORT (search)
exports.getUserByIpOrEmail=(req,res)=>{
    const searchValue=req.params.search;
    connection.query('SELECT * FROM userdata WHERE ip_address=? OR email=?',[searchValue, searchValue],(err, rows, fields)=>{
        if(err) {
            res.status(500).json({message:"Database query failed"});
            return;
        }
        
        if(rows.length>0)
            res.json(rows)
        else
            res.status(404).json({message:"404 User not found!"})

    })
}


//CREATE
exports.createUser=(req,res)=>{
  const {fname,lname,email,gender,ip,salary}=req.body; 
  connection.query('INSERT INTO userdata (first_name,last_name,email,gender,ip_address,salary) VALUES (?,?,?,?,?,?)',[fname,lname,email,gender,ip,salary],(err,result)=>{
    if(err) throw err;
    res.json({message:'User created successfully',id:result.insertId});
  });
}

//UPDATE
exports.updateUser=(req,res)=>{
    const {id,fname,lname,email,gender,ip,salary}=req.body; 
    connection.query('UPDATE userdata SET first_name=?, last_name=?, email=?, gender=?, ip_address=?, salary=? WHERE id=?',[fname,lname,email,gender,ip,salary,id], (err, result)=>{
         if(err) throw err;
         if(result.affectedRows>0)
            res.json({message:'User udpated successfully'});
         else
            res.status(404).json({message:'User not found'});
    })
}



//DELETE
exports.deleteUser=(req,res)=>{
  const id=req.body.id;
  connection.query('DELETE FROM userdata WHERE id=?',[id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0)
        res.json({message:'User deleted successfully'});
    else
        res.status(404).json({message:'User not found'});
  });
}