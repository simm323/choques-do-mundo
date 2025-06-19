document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });

    const pollButtons = document.querySelectorAll('.poll-button');
    let votes = { antigo: 58, inovador: 42 }; 
    let totalVotes = 100;
    let hasVoted = false;

    pollButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (hasVoted) return;
            hasVoted = true;

            const voteType = button.dataset.vote;
            votes[voteType]++;
            totalVotes++;

            updatePoll();
        });
    });

    function updatePoll() {
        const percentAntigo = ((votes.antigo / totalVotes) * 100).toFixed(1);
        const percentInovador = ((votes.inovador / totalVotes) * 100).toFixed(1);

        document.getElementById('fill-antigo').style.width = `${percentAntigo}%`;
        document.getElementById('percent-antigo').textContent = `${percentAntigo}%`;

        document.getElementById('fill-inovador').style.width = `${percentInovador}%`;
        document.getElementById('percent-inovador').textContent = `${percentInovador}%`;

        pollButtons.forEach(btn => btn.disabled = true);
    }

    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://choquesdomundo-podcast.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
});