const api = {
    map: { "º": "ș", "ª": "Ș", "ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț", "þ": "ț", "Þ": "Ț", "ã": "ă", "Ä": "Ă"},
    files: [],
    fix(string) {
        for(var i = 0;i < string.length;i++)
            if(string[i] in api.map)
                string[i] = api.map[string[i]];
        return string;
    },
    getFiles(id)
    {
        return document.getElementById(id).files;
    },
    processFiles()
    {
        var reader = new FileReader();
        var f = this.getFiles("subtitle-files");
        for(const fil of f)
        {
			reader = new FileReader();
			reader.addEventListener('load', (event) => {
				const result = event.target.result;
				api.files.push({content: this.fix(result), name: fil.name.replace(".srt", "_correct.srt")});
			});
            reader.readAsText(fil, 'iso-8859-2');
        }
    },
    downloadFiles() {
		var file = null;
        for (var i = 0;i < this.files.length;i++) {
		  file = this.files[i];
          const blob = new Blob([file.content], { type: "text/plain;charset=unicode" });
      
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = file.name;
      
          link.click();
          link.remove();
        }
    },
    doit()
    {
        this.processFiles();
        this.downloadFiles();
    },
    clean()
    {
        this.files = [];
    }
};
