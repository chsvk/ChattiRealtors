<template>
    <div class="add">

        
        <h1>Enter Plot Details</h1>
        <div class="dets">
        <div class="left">
        <input type="text" placeholder="Heading">
        <input type="text" placeholder="Location">
        <input type="text" placeholder="Price">
        <input type="text" placeholder="Negotiable?">
        <input type="text" placeholder="Rate Per Sq.Yard">
        <input type="text" placeholder="Facing">
        <input type="text" placeholder="Length">
        <input type="text" placeholder="Breadth">
        <input type="text" placeholder="Bus Route">
        </div>
        <div class="right">
        <textarea name="" id="" cols="60" rows="10" placeholder="Enter Development Details in and around the area"></textarea>
        <textarea name="" id="" cols="60" rows="10" placeholder="Enter Amenities present for the plot"></textarea>
        </div>
        </div>
        <div class="dets">
            <div class="UploadImages" style="padding: 1em;">
                <h3 style="text-align: center; font-style: italic;">Upload Display Images</h3>
                <div class="upload-btn-wrapper" >
                    <button class="btn">Upload Files</button>
                    <input id="developmentImages" type="file" name="myfile" />
                </div><br>
                <progress value="0" max="100" id="uploaderd">0%</progress><br>
            </div>
            <div class="UploadImages" style="padding: 1em;">
                <h3 style="text-align: center; font-style: italic;">Upload Development Images</h3>
                <div class="btn" >
                    <input id="developmentImages" type="file" name="myfile" />
                    <progress value="0" max="100" id="uploaderd">0%</progress><br>
                    <button class="btn">Upload Files</button>
                </div><br>
                
            </div>
        </div>
        <div class="dets">
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
<form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>

        </div>
        <div class="dets">
        <input type="text" placeholder="Scope For Hike">
        <textarea name="" id="" cols="60" rows="10" placeholder="Enter Any Note"></textarea>
        </div>
        

    </div>
</template>

<script>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
export default {
    data(){
        return{
            
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos',
            fileCount: 0,
        }
    },
    methods: {
        save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;
        upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      },
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },


    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    mounted() {
      this.reset();
    },

}
</script>


<style lang="scss" scoped>

    .add{
        margin: 1em;
        input{
            display: block;
            border: none;
            width: 500px;
            padding: 1em;
            font-size: 1em;
            margin: 0.7em;
        }
        textarea{
            display: block;
            margin: 1em;
            font-size: 1em;
        }

        .dets{
            display: grid;
            grid-template-columns: 50% auto;
        }

        .UploadImages{
            width: 300px;
            margin: 3em;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border-radius: 15px;
            
            button{
                border: none;
                background: #AD974f;
                border-radius: 8px;
                width: 100%;
                padding: 1em;
                color: white;
            }

            progress{
                margin: 0.7em;
            }
        }
    }

    .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }


</style>
