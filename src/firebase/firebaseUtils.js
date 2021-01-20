import firebase from './firebaseConfig.js';

  export const uploadImage = (image) => {
    return new Promise((resolve, reject) =>{
      const file = image;
    const storageRef = firebase.storage().ref();
    const fileName = Date() + '_' + file.name;

    var uploadTask = storageRef.child(`${process.env.REACT_APP_FIREBASE_STORAGE_CATALOG}/${fileName}`).put(file);

    const status = {
      imageUrl: null,
      error: null,
      progress: 0,
      status: 0
    }

    uploadTask.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      status.progress = progress;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        default: break;
      }
    }, function (error) {
      status.error = error;
    },function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      });
    })
    
  };

 
export default firebase;