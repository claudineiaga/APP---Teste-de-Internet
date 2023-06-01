// Selecionando os Dados
const loaderEl = document.getElementById('loader')
const detectSpeedBtn = document.getElementById('detect-speed')
const bitsEl = document.getElementById('bits-speed')
const kbpsEl = document.getElementById('kbps-speed')
const mbpsEl = document.getElementById('mbps-speed')

// Fonte de uma imagem para verificar a velocidade
let imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/132C_trans.gif/230px-132C_trans.gif?time="+ (new Date().getTime());

detectSpeedBtn.addEventListener('click', e => {
    e.preventDefault
    var bits = 0;
    var kbps = 0;
    var mbps = 0;
    var starTime = 0;
    var endTime = 0;
    detectSpeedBtn.disabled = true
    loaderEl.style.display = `flex`

    var img = new Image()
    img.crossOrigin = ''
    var imgSize = 0;

    starTime = new Date().getTime();
    img.src = imageSrc

    img.onload = async ()=>{
        endTime = new Date().getTime()

        // Aguardando a resposta do link da imagem e obtenha o tamanho da imagem
        await fetch(imageSrc)
        .then(response => {
            imgSize = response.headers.get("content-length")
            console.log(imgSize)
            var timeDiff = (endTime - starTime) / 1000;
            var loadedImgSizeInBits = imgSize * 8;
            bits = (loadedImgSizeInBits / timeDiff)
            kbps = (bits / 1024)
            mbps = (kbps / 1024)
            return
        })
        .then( () =>{
            var tmpBits = 0;
            var tmpKb = 0;
            var tmpMb = 0;
            // Animando o resultado
            function animate(){
                if(tmpBits < bits || tmpKb < kbps || tmpMb < mbps){
                    bitsEl.innerText = tmpBits.toLocaleString('pt-BR',{style:'decimal', maximumFractionDigits:2})
                    kbpsEl.innerText = tmpKb.toLocaleString('pt-BR',{style:'decimal', maximumFractionDigits:2})
                    mbpsEl.innerText = tmpMb.toLocaleString('pt-BR',{style:'decimal', maximumFractionDigits:2})
                    tmpBits = tmpBits + (bits  / 20);
                    tmpKb = tmpKb + (kbps  / 20);
                    tmpMb = tmpMb + (mbps  / 20);
                    setTimeout(animate, 30)
                }else{
                    bitsEl.innerText = bits.toLocaleString('pt-BR',{style:'decimal', maximumFractionDigits:2})
                    kbpsEl.innerText = kbps.toLocaleString('pt-BR',{style:'decimal', maximumFractionDigits:2})
                    mbpsEl.innerText = mbps.toLocaleString('pt-BR',{style:'decimal', maximumFractionDigits:2})
                    detectSpeedBtn.disabled = false
                    detectSpeedBtn.innerText = `Testar Novamente`
                    loaderEl.style.display = `none`
                }
            }
            animate()
        })
    }
})