function toggleCollapse(id) {
    const allBodies = document.querySelectorAll('.card-body');
    const el = document.getElementById(id);

    allBodies.forEach(body => {
      if (body !== el) {
        body.classList.remove('active');
      }
    });

    el.classList.toggle('active');
  }