const { Sigaa } = require('sigaa-api');

const sigaa = new Sigaa({
  url: 'https://sigaa.ifsc.edu.br',
  institution: 'IFSC'
});

// coloque seu usuário
const username = '';
const password = '';

const main = async () => {
  const account = await sigaa.login(username, password); // login

  /**
   * O usuário pode ter mais de um vínculo
   * @see https://github.com/GeovaneSchmitz/sigaa-api/issues/4
   **/
  const bonds = await account.getActiveBonds();

  //Para cada vínculo
  for (const bond of bonds) {
    if (bond.type !== 'student') continue; // O tipo pode ser student ou teacher

    //Se o tipo do vínculo for student, então tem matrícula e curso
    console.log('Matrícula do vínculo: ' + bond.registration);
    console.log('Curso do vínculo: ' + bond.program);

    // Se for usado bond.getCourses(true); todas as turmas são retornadas, incluindo turmas de outros semestres
    const courses = await bond.getCourses();

    // Para cada turma
    for (const course of courses) {
      console.log(course.title);
      const newsList = await course.getNews();
      for (const news of newsList) {
        console.log(news.title);
        console.log('id:' + news.id);

        console.log(await news.getContent());
        console.log((await news.getDate()).toString());
        console.log('');
      }
      console.log('');
    }
  }

  // Encerra a sessão
  await account.logoff();
};

main().catch((err) => {
  if (err) console.log(err);
});
