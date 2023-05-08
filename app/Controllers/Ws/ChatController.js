'use strict'
const Ws = use('Ws')
const User = use('App/Models/User')
const Database = use('Database')
const Drive = use('Drive')
const {v4: uuidv4} = require('uuid')
const axios = require('axios')
const {spawn} = require("child_process")
const mkdirp = require('mkdirp')

const basePath_url = '41.189.178.40/';

class ChatController {
    static appendToSocketList(socketid, mysocket) {
        if (typeof this.mysocketlist === 'undefined') {
            this.mysocketlist = {}
        }
        this.mysocketlist[socketid] = mysocket
    }

    static getSocket(mysocketid) {
        return this.mysocketlist[mysocketid];
    }

    constructor({socket, request, auth}) {
        this.socket = socket
        this.socketid = socket.id
        this.starttime = new Date()

        socket.emitTo('message', {
            socketid: socket.id
        }, [socket.id])
    }

    async onMessage(message) {
        if (typeof message.socketid !== 'undefined') {
            ChatController.appendToSocketList(message.socketid, message)

            let updatecolumn = ""
            switch (ChatController.getSocket(this.socketid).type.toLowerCase()) {
                case 'audio':
                    updatecolumn = 'connectedtoaudio'
                    break;
                case 'video':
                    updatecolumn = 'connectedtovideo'
                    break;
                case 'call':
                    updatecolumn = 'connectedtocall'
                    break;
                case 'chat':
                    updatecolumn = 'connectedtochat'
                    break;
                default:
                    break;
            }

            let table = typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' ? 'enrolments' : 'instructor_courses';
            let wherecolumn = typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' ? 'studentid' : 'instructorid';
            let userid = typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' ? ChatController.getSocket(this.socketid).studentid : ChatController.getSocket(this.socketid).instructorid;
            // console.log(table, wherecolumn, updatecolumn, userid)
            await Database
                .table(table)
                .where(wherecolumn, userid)
                .update(updatecolumn, 1)

            console.log(`connected_${ChatController.getSocket(this.socketid).type.toLowerCase()}: ${userid}`)

          switch (ChatController.getSocket(this.socketid).type.toLowerCase()) {
            case 'audio':
              this.socket.broadcastToAll('message', {
                connected_audio: userid
              })
              break;
            case 'video':
              this.socket.broadcastToAll('message', {
                connected_video: userid
              })
              break;
            case 'call':
              this.socket.broadcastToAll('message', {
                connected_call: userid
              })
              break;
            case 'chat':
              this.socket.broadcastToAll('message', {
                connected_chat: userid
              })
              break;
            default:
              break;
          }
        }
        else {
            this.socket.broadcastToAll('message', message)
        }
    }

    async onClose() {
        let updatecolumn = ""
        switch (ChatController.getSocket(this.socketid).type.toLowerCase()) {
            case 'audio':
                updatecolumn = 'connectedtoaudio'
                break;
            case 'video':
                updatecolumn = 'connectedtovideo'
                break;
            case 'call':
                updatecolumn = 'connectedtocall'
                break;
            case 'chat':
                updatecolumn = 'connectedtochat'
                break;
            default:
                break;
        }

        let table = typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' ? 'enrolments' : 'instructor_courses';
        let wherecolumn = typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' ? 'studentid' : 'instructorid';
        let userid = typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' ? ChatController.getSocket(this.socketid).studentid : ChatController.getSocket(this.socketid).instructorid;
        // console.log(table, wherecolumn, updatecolumn, userid)
        await Database
            .table(table)
            .where(wherecolumn, userid)
            .update(updatecolumn, 0)

        console.log(`disconnected_${ChatController.getSocket(this.socketid).type.toLowerCase()}: ${userid}`)

      switch (ChatController.getSocket(this.socketid).type.toLowerCase()) {
        case 'audio':
          Ws.getChannel(`chat:*`).topic(`chat:${ChatController.getSocket(this.socketid).instructorcourseid}`).broadcast('message', {
            disconnected_audio: userid
          })
          break;
        case 'video':
          Ws.getChannel(`chat:*`).topic(`chat:${ChatController.getSocket(this.socketid).instructorcourseid}`).broadcast('message', {
            disconnected_video: userid
          })
          break;
        case 'call':
          Ws.getChannel(`chat:*`).topic(`chat:${ChatController.getSocket(this.socketid).instructorcourseid}`).broadcast('message', {
            disconnected_call: userid
          })
          break;
        case 'chat':
          Ws.getChannel(`chat:*`).topic(`chat:${ChatController.getSocket(this.socketid).instructorcourseid}`).broadcast('message', {
            disconnected_chat: userid
          })
          break;
        default:
          break;
      }

        // if (true) {
        /*if (typeof this.foldertype !== 'undefined' && typeof this.filename !== 'undefined') {
            let sessionid = this.sessionid;

            try {
                let res = await axios.get("http://41.189.178.19/schooldirect/fileutils.php", {
                    params: {
                        foldertype: this.foldertype,
                        filename: this.filename
                    }
                })
                console.log(res.data)
                /!*if (res.data.url) {
                    let urls = res.data.url.replace(/.$/, "");
                    let urls_array = urls.split(`;`).sort()
                    urls_array.push(urls_array.shift())

                    var arrayLength = urls_array.length;
                    for (var i = 0; i < arrayLength; i++) {
                        urls_array[i] = "file " + urls_array[i]
                    }

                    console.log(urls_array.join(`\n`))
                    var drive_result = await Drive.put('url_list.txt', Buffer.from(urls_array.join(`\n`)))

                    /!*mkdirp(`/var/www/html/merged-files/${this.type}`, function(err) {

                        // path exists unless there was an error
                        console.log("sddddddddddddddddd", error)

                    });*!/

                    const files_merge_spawn_res = spawn("ffmpeg", [
                        "-f",
                        "concat",
                        "-safe",
                        "0",
                        "-protocol_whitelist",
                        "file,http,tcp",
                        "-i",
                        "/var/www/node-projects/school_direct_node_backend/tmp/url_list.txt",
                        "-c",
                        "copy",
                        `/var/www/html/merged-files/${this.type.toLowerCase()}/${this.sessionid}.mp4`,
                        "-nostdin",
                        "-y"
                    ]);

                    /!*spawn_res.stdout.on("data", data => {
                        console.log(`stdout: ${data}`);
                    });

                    spawn_res.stderr.on("data", data => {
                        // console.log(`stderr: ${data}`);
                    });

                    spawn_res.on('error', (error) => {
                        console.log(`error: ${error.message}`);
                    });

                    spawn_res.on("close", code => {
                        // console.log(`child process exited with code ${code}`);
                    });*!/

                    // Async Iteration available since Node 10
                    let files_merge_stdout_triggered = false
                    for await (const data of files_merge_spawn_res.stdout) {
                        files_merge_stdout_triggered = true
                        console.log(`files_merge_stdout from the child: ${data}`);
                    }

                    let files_successfully_merged = false
                    for await (const data of files_merge_spawn_res.stderr) {

                        console.log(`files_merge_stderr from the child: ${data}`);
                        if (!data.toString().includes(" Impossible to open")) {
                            files_successfully_merged = true
                        }
                    }

                    if (files_merge_stdout_triggered) {
                        // console.log("hurrayy!!! files_merge_stdout_triggered")
                    }

                    if (files_successfully_merged) {
                        console.log("Files successfully merged!!")
                        let table = this.type.toLowerCase() == 'video' ? 'recorded_video_streams' : 'recorded_audio_streams'
                        const result = await Database
                            .from(table)
                            .where('sessionid', sessionid = this.sessionid)
                            .update('url', `${basePath_url}merged-files/${this.type.toLowerCase()}/${this.sessionid}.mp4`)
                    } else {
                        console.log("Error merging files.")
                    }

                    /!*!// check if resulting video is streamable
                    const stream_check_spawn_res = spawn("ffprobe", [
                        "-v",
                        "quiet",
                        "-print_format",
                        "json",
                        "-show_streams",
                        `/var/www/html/merged-files/${this.type.toLowerCase()}/${this.sessionid}.mp4`,
                    ]);

                    /!*spawn_res.stdout.on("data", data => {
                        console.log(`stdout: ${data}`);
                    });

                    spawn_res.stderr.on("data", data => {
                        // console.log(`stderr: ${data}`);
                    });

                    spawn_res.on('error', (error) => {
                        console.log(`error: ${error.message}`);
                    });

                    spawn_res.on("close", code => {
                        // console.log(`child process exited with code ${code}`);
                    });*!/

                    // Async Iteration available since Node 10
                    let stream_check_stdout_triggered = false
                    for await (const data of stream_check_spawn_res.stdout) {
                        stream_check_stdout_triggered = true
                        console.log(`stream_check_stdout from the child: ${data}`);
                    }

                    let stream_check_stderr_triggered = false
                    for await (const data of stream_check_spawn_res.stderr) {
                        stream_check_stderr_triggered = true
                        console.log(`stream_check_stderr from the child: ${data}`);
                    }

                    if(stream_check_stdout_triggered){
                        console.log("hurrayy!!! stream_check_stdout_triggered")
                    }

                    if(stream_check_stderr_triggered){
                        console.log("hurrayy!!! stream_check_stderr_triggered")
                    }*!/


                }*!/
            } catch (err) {
                console.error('Parent error', err);
            }
        }*/


        if (typeof ChatController.getSocket(this.socketid).type !== 'undefined' && typeof ChatController.getSocket(this.socketid).studentid !== 'undefined' && typeof ChatController.getSocket(this.socketid).sessionid !== 'undefined') {
            const currentDate = new Date()
            let date = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
            const attendances = await Database.from('attendances')
                .where('sessionid', ChatController.getSocket(this.socketid).sessionid)
                .where('type', ChatController.getSocket(this.socketid).type)
                .where('created_at', 'like', `${date}%`)
            // console.log(`${attendances.length > 0} ${attendances[0].length > 0} ${attendances[0].sessionid}`)
            let duration = (new Date() - this.starttime) / 1000;

            if (attendances.length > 0 && attendances[0].sessionid == ChatController.getSocket(this.socketid).sessionid) {
                // console.log('if')
                const affectedRows = await Database
                    .table('attendances')
                    .where('sessionid', ChatController.getSocket(this.socketid).sessionid)
                    .where('type', ChatController.getSocket(this.socketid).type)
                    .where('created_at', 'like', `${date}%`)
                    /*.where(
                        {
                            sessionid: ChatController.getSocket(this.socketid).sessionid,
                            type: ChatController.getSocket(this.socketid).type
                        }
                    )*/
                    .update('duration', attendances[0].duration + duration)
            } else {
                // console.log('else')
                const id = await Database
                    .table('attendances')
                    .insert({
                        attendanceid: uuidv4(),
                        sessionid: ChatController.getSocket(this.socketid).sessionid,
                        type: ChatController.getSocket(this.socketid).type,
                        studentid: ChatController.getSocket(this.socketid).studentid,
                        duration: duration,
                        created_at: date + " " + currentDate.getHours() + "-" + (currentDate.getMinutes()) + "-" + currentDate.getSeconds(),
                        updated_at: date + " " + currentDate.getHours() + "-" + (currentDate.getMinutes()) + "-" + currentDate.getSeconds()
                    })
            }

        } else if (typeof ChatController.getSocket(this.socketid).sessionid !== 'undefined') {
            let table = ChatController.getSocket(this.socketid).type.toLowerCase() == 'video' ? 'class_video_sessions' : 'class_audio_sessions'

            /*const affectedRows = await Database
                .table(table)
                .where('sessionid', ChatController.getSocket(this.socketid).sessionid)
                .delete()*/
        }
    }
}

module.exports = ChatController
