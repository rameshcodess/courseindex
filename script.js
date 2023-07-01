
const container = document.querySelector('.list');
const getName = (link, directoryLevel) => {
    const arr = link.split('/');
    return arr[arr.length - directoryLevel];
}
const links = ['./aug1.json','./edge.json', './systemDesignWithPatterns.json', './apr21.json']

// const aug1 = './aug1.json';
// const edge = './edge.json';

function load(linkIndex = 0, directoryLevel = 2, sort) {
    const lists = document.querySelectorAll('li');
    lists.forEach((list, index) => {
        if(index !== 0) {
            list.remove();
        }
    });
    fetch(links[linkIndex]).then(res => res.json()).then(data => {
        const links =  data;
        if(sort) {
            links.sort((a, b) => {
                const nameA = getName(a, directoryLevel);
                const nameB = getName(b, directoryLevel);
                return nameA.localeCompare(nameB, undefined, {numeric: true, sensitivity: 'base'});
               
            })
        }
        links.forEach(link => {
            const template = document.querySelector('li');
            const clone = template.cloneNode(true);
            let name = getName(link, directoryLevel);
            name = name.replaceAll('%20', ' ');
            name = name.replaceAll('%7', ' ');
            name = name.replaceAll(':', '_');
            const a = clone.querySelector('.link');
            a.dataset.url = link
            a.innerText = name;
        container.appendChild(clone);
        })
    });
}
load();

container.addEventListener('click', (e) => {
    e.preventDefault
    if(e.target.classList.contains('link')) {
        // const name = e.target.dataset.name;
        const name = e.target.innerText;
         navigator.clipboard.writeText(name)
         .then(() => {
            window.open(e.target.dataset.url, '_blank');
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
    }
})

document.querySelector('.aug21').addEventListener('click', () => {
    document.querySelector('h1').innerText = 'Aug 21';
    load(0);
});
document.querySelector('.edge').addEventListener('click', () => {
    document.querySelector('h1').innerText = 'Edge';
    load(1);
});
document.querySelector('.systemDesignWithPatterns').addEventListener('click', () => {
    document.querySelector('h1').innerText = 'systemDesignWithPatterns';
    load(2, 1, true);
});
document.querySelector('.apr21').addEventListener('click', () => {
    document.querySelector('h1').innerText = 'apr21';
    load(3);
});


