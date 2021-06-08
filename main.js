let fs = require('fs');
let path = require('path');
let inputArr = process.argv.slice(2); 

// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directorypath"
// node main.js help
let command = inputArr[0]; 

let types = {
    videos: ["mp4", "mkv"],
    audio: [ "aac", "mp3", "flac"],
    images: ["jpeg", "png", "jpg", "gif"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    document: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'txt','ps', 'html'],
    app: ['exe', 'dmg', 'pkg', 'ded', 'apk', 'msi'],
    script: ['js'],
    presentation: ['pptx']
    

}

switch(command){
    case 'tree':
        treeFn(inputArr[1]);
        break;
    case 'organize':
        organizeFn(inputArr[1]);
        break;
    case 'help':
            helpFn();
        break;
    default:
        console.log("please input correct command");
        break;
}

function treeFn(dirPath){
    console.log("Tree command implemented for ", dirPath);
}








function organizeFn(dirPath){
    let destPath;
    // 1.
    if(dirPath == undefined){
        console.log("kindly enter the path");
        return;
    }
    else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            
            // 2.
            destPath = path.join(dirPath, "organized_files" );
            if(fs.existsSync(destPath) == false ){
                fs.mkdirSync(destPath);    
            }
            
        }
        else{
            console.log("kindly eneter the correct path");
        }
    }

     organizeHelper(dirPath, destPath);


}


function organizeHelper(src, dest){

   let childNames  = fs.readdirSync(src);

    // console.log(childNames);

    for(let i=0; i<  childNames.length; i++){

        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            //console.log(childNames[i]);
            let category = getcategory(childNames[i]);
            console.log(childNames[i], "belongs to -->", category);
       
            // copy file 
            sendFile(childAddress, dest, category);
        }
    }
}

function sendFile(srcFilePath,dest,category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);
}


function getcategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i = 0; i< cTypeArray.length; i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}






// help implemented
function helpFn(dirPath){

    console.log(`
    
        List of All the commands:
                        node main.js tree "directoryPath"
                        node main.js organize "directorypath"
                         node main.js help `);


}



// let type = {
//     media: ["mp4", "mkv", "mp3"],
//     archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
//     document: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'txt','ps'],
//     app: ['exe', 'dmg', 'pkg', 'ded']

// }