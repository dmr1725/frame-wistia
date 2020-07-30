const axios = require('axios')
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const keys = require('./keys')

const urls = []

keys.frameToken

const getUser = async()=>{
    const response = await axios.get('https://api.frame.io/v2/me', {
    headers: {
        Authorization: `Bearer ${keys.frameToken}`
    }
    })

    // account_id
    // console.log(response.data.account_id)
    console.log(response)
    
    return response
}

const getTeamId = async()=>{
    const response = await axios.get(' https://api.frame.io/v2/accounts/4ea34927-7a59-4aed-9577-cbd3c09a3ea4/teams', {
    headers: {
        Authorization: `Bearer ${keys.frameToken}`
    }
    })
    // team id
    console.log(response.data[0].id)
    return response
}

const getProjects = async()=>{
    const response = await axios.get(' https://api.frame.io/v2/teams/a2e98a0f-13a0-4700-b53e-2d54a9d70c5f/projects', {
    headers: {
        Authorization: `Bearer ${keys.frameToken}`
    }
    })
    
    console.log(response.data[1])
   
    return response
}


// get all files given in a project with the root_asset_id of that project. This is not using FOLDERS
const getAllFiles = async()=>{
    // root_asset_id. Este root_asset_id viene de getProjects
    const response = await axios.get(' https://api.frame.io/v2/assets/4ec27e4c-c2c5-4c4d-be7a-d19624a35257/children', {
    headers: {
        Authorization: `Bearer ${keys.frameToken}`
        }
    })

    const length = response.data.length


    for(let i = 0; i < length; i++){
        // console.log(response.data[i].downloads.h264_360)
        const url = response.data[i].original
        urls.push(url)
    }
    
    
    return response
}

const getSomething = async()=>{
    // root_asset_id. Este root_asset_id viene de getProjects
    const response = await axios.get('https://api.frame.io/v2/assets/4ec27e4c-c2c5-4c4d-be7a-d19624a35257/children?type=folder', {
    headers: {
        Authorization: `Bearer ${keys.frameToken}`
    }
    })
    
    console.log(response)
   
    return response
}

const getAllFilesGivenFolder = async()=>{
    // folderId
    const response = await axios.get('https://api.frame.io/v2/assets/766526ec-041d-4c0d-8970-d6c252db471d/children', {
    headers: {
        Authorization: `Bearer ${keys.frameToken}`
        }
    })
    
    // console.log(response.data[0].original)

    const length = response.data.length
    

    for(let i = 0; i < length; i++){
        // console.log(response.data[i].downloads.h264_360)
        const url = response.data[i].original
        urls.push(url)
    }
    // console.log(urls)



    var access_token = keys.wistiaToken;
    for(let i = 0; i < length; i++){
        var requestData = $.param({
            access_token: access_token,
            url: urls[i]
        });
    
        $.ajax({
        type:'POST',
        url: 'https://upload.wistia.com',
        data: requestData,
        contentType: 'application/x-www-form-urlencoded',
        cache: false,
        processData: false,
        success:function(data) {
            console.log(data);
            // alert('Success!');
        },
        error: function(data) {
            console.log(data);
            // alert('Error');
        }
        });
  
  
    }
   
    return response
}


getAllFilesGivenFolder()












