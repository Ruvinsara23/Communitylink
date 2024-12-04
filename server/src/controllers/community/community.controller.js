const Community = require('../../models/community/community.model');

exports.createCommunity=async(req,res)=>{
    const {name, description, bannerImage,createdBy}=req.body;

  try{
    const newCommunity = await new Community({
        name:name,
        description:description,
        bannerImage:bannerImage||'null',
        createdBy:createdBy

    })

    await newCommunity.save()

    res.status(200).json({
        message:"community register sucessfully",
        slug:Community.slug,
    })


    }catch(error){
        console.log("Error creating Community ",error)
    }
}