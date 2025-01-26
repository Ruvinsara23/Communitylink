const { messaging } = require('firebase-admin');
const Community = require('../../models/community/community.model');

exports.createCommunity=async(req,res)=>{
    const {name, description, bannerImage,createdBy}=req.body;

  try{
    const newCommunity = await new Community({
        name:name,
        description:description,
        bannerImage:bannerImage||'null',
        createdBy:createdBy || 'null'

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

exports.getComunitiesByUser=async(req,res)=>{
  const { userId } = req.params; 


try{
    const createdCommunities = await Community.find({
        createdBy:userId
      });
    
      const adminCommunities = await Community.find({ 
        admins:userId
    });
    
    const memberCommunities= await Community.find({members:userId,
        members: userId,
        createdBy: {$ne: userId},
        admins: {$ne:userId},
    })
    
    res.status(200).json({
        createdCommunities,
        adminCommunities,
        memberCommunities
    })

}catch(error){
    res.status(500).json({
        messaging:"Error feting user communities ",error
    })
}
 
}

exports.getCommunityBySlug=async(req,res)=>{
    const {slug}=req.params
    console.log('Received slug:', slug);
    try{
        const community= await Community.findOne({slug:'testnew'})
        .populate('members', 'name email')
        .populate('admins', 'name email')
        .populate({
          path: 'posts',
          populate: {
              path: 'userId',
              select: 'name email profilePicture'
          }
      })
        .populate('events')
        .populate('polls')

      
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
          }
          res.status(200).json({
            community
        })

    }catch(error){
        console.error('Error fetching community:', error.message);
    res.status(500).json({ message: 'Error fetching community', error: error.message });

    }

}

exports.updateCommiunity=async(req,res)=>{
  const {id,name,description,bannerimage}=req.body
  try {
    const updatedCommunity= await Community.findByIdAndUpdate({_id:id},{
        name:name,
        description:description,
        bannerimage:bannerimage 
    },{new:true})

    if(!updatedCommunity){
        console.log("Someting went wrong in update communiity")
    }
  
    res.status(200).json({
        message:"updated sucessfully",
        updatedCommunity
    })

  }catch(error){
    res.send(400).json({
        message:"something went wrong in update"
    })

  }
}


// exports.updateCommunity = async (req, res) => {
//   const { id, name, description, bannerimage } = req.body;

//   try {
//     const updatedCommunity = await Community.findByIdAndUpdate(
//       { _id: id },
//       {
//         name: name,
//         description: description,
//         bannerimage: bannerimage,
//       },
//       { new: true } 
//     );

//     if (!updatedCommunity) {
//       console.log('Something went wrong in updating the community');
//       return res.status(404).json({ message: 'Community not found' });
//     }

//     res.status(200).json({
//       message: 'Updated successfully',
//       updatedCommunity,
//     });
//   } catch (error) {
//     console.error('Error updating community:', error.message);
//     res.status(400).json({
//       message: 'Something went wrong in update',
//       error: error.message,
//     });
//   }
// };


exports.addMember = async (req, res) => {
    const { communityId, userId } = req.body;
  
    try {
     
      const updatedCommunity = await Community.findByIdAndUpdate(
        communityId,
        { $addToSet: { members: userId } }, 
        { new: true } 
      ).populate('members', 'displayName email '); 
  
      if (!updatedCommunity) {
        return res.status(404).json({ message: 'Community not found' });
      }
  
      res.status(200).json({
        message: 'Member added successfully',
        updatedCommunity,
      });
    } catch (error) {
      console.error('Error adding member:', error.message);
      res.status(500).json({
        message: 'Something went wrong while adding the member',
        error: error.message,
      });
    }
  };
  
  exports.uploadCommunityImages = async (req, res) => {
    try {
        const { communityId } = req.params;
        const community = await Community.findById(communityId);

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        const communityImage = req.files?.communityImage?.[0]?.buffer.toString("base64") || community.communityImage;
        const bannerImage = req.files?.bannerImage?.[0]?.buffer.toString("base64") || community.bannerImage;

        community.communityImage = communityImage;
        community.bannerImage = bannerImage;

        await community.save();

        res.status(200).json({
            message: "Images updated successfully",
            communityImage,
            bannerImage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update community images" });
    }
};


