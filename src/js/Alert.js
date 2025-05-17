export default class Alert {
    constructor(jsonUrl) {
        this.jsonUrl = jsonUrl;
    }

    async init() {
        try {
            const response = await fetch(this.jsonUrl);
            if (!response.ok) throw new Error('Failed to load alerts');
            const data = await response.json();            

            if (data.length > 0) {
                this.displayAlerts(data);
            }

        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    }

    displayAlerts(alerts) {
        const section = document.createElement('section');
        section.classList.add('alert-list');     

        alerts.forEach(alert => {
            const p = document.createElement('p');
            p.textContent = alert.message;
            p.style.backgroundColor = alert.background;
            p.style.color = alert.color;
            //p.style.padding = '1em';
            //p.style.margin = '0';
            //p.style.textAlign = 'center';
            p.style.position = 'relative';
            section.appendChild(p)

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '✕';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '5px';
            closeBtn.style.right = '10px';
            closeBtn.style.background = 'transparent';
            closeBtn.style.border = 'none';
            closeBtn.style.color = alert.color;
            closeBtn.style.fontSize = '1.2rem';
            closeBtn.style.cursor = 'pointer';

            closeBtn.addEventListener('click', () => {
            p.remove(); 
        });

        p.appendChild(closeBtn);
    section.appendChild(p);
  });

        const main = document.querySelector('main');
        if (main) {
            main.prepend(section);
        }
    }
}