const blogModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorId = req.body.authorId
        let authorDetails = await authorModel.findById(authorId);
        if (!authorDetails){
        return res.status(404).send({ status: false, msg: "No such author exists" });
        }
    else{
        let saveData = await blogModel.create(data)
        res.status(201).send({ status: true, msg: saveData }) 
     }  
    }
    catch (err) {
        res.status(500).send({msg:"error", error: err.message })
    }
}


const getSpecificAllBlogs = async function (req, res) {
    try {
      let data = req.query;
    //   let filter = {
    //     isDeleted: false,
    //     isPublished: true,
    ///     ...data,
    //   };
  
      let getSpecificBlogs = await blogModel.find({$and:[data,{isDeleted:false},{isPublished:true}]})
  
      if (getSpecificBlogs.length == 0) {
        return res.status(400).send({ status: false, data: "No blogs can be found" });
          
     } else {
        return res.status(200).send({ status: true, data: getSpecificBlogs });
      }
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };


  const updateBlog=async function(req,res){
    try{
    let blog_id=req.params.blogId
    let data=req.body
    if(!blog_id) return res.status(400).send("no blogId found")
    let check=await blogModel.findById(blog_id)
    if(!check) return res.status(400).send("invalid blog Id")
    if(check.isDeleted==true) return res.status(404).send("we can't update a delete blog")
     let update=await blogModel.findByIdAndUpdate(blog_id,
     {$set:data},
     {new:true}
     )
     res.status(400).send({status:true,msg:update})
    }
    catch(err){
      res.status(500).send({error:err.message})
    }
  }
    

  const deletequeryParams=async function(req,res)
{
  
    let data1=req.params.query;
    let data=req.body
    let deletequeryP=await blogModel.deleteOne({$and:[data1]})
    if (data1){
    
  }
 
};


module.exports.createBlog = createBlog
module.exports.getSpecificAllBlogs = getSpecificAllBlogs
module.exports.updateBlog=updateBlog
module.exports.deletequeryParams=deletequeryParams
