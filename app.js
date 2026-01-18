fetch('./project.json')
  .then(response => {
    if (!response.ok) throw new Error('error');
    return response.json();
  })
  .then(data => {
    const projects = data.project;
    const container = document.getElementById('container');

    projects.forEach(project => {
      let bloc = document.createElement('a');
      bloc.classList = 'bloc';
      bloc.href = project.url;
      bloc.target = '_blank';
      let badge;
      if(project.badge !== undefined){
        badge = `<span class="badge badge--${project.badge}">${project.badge}</span>`
      }
      bloc.innerHTML = `
        <span class="icon">
        <img src="images/${project.image}.svg" />
        </span>
        ${badge || ''}
        <h2 class="title">${project.name}</h2>
        <p class="desc">${project.description}</p>
        <span class="typewriter"></span>
      `;

      container.appendChild(bloc);

      if (Array.isArray(project.stats) && project.stats.length > 0) {
        const span = bloc.querySelector('.typewriter');

        new Typewriter(span, {
          strings: project.stats.map(item => item.toString()), // transforme chaque élément en texte
          autoStart: true,
          loop: true,
          delay: 100,
          deleteSpeed: 50 // vitesse de suppression
        });
      }
    });
  })
  .catch(error => console.error(error));
