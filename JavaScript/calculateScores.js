function calculateScores0611(grades) {
    // Define the maximum scores for each category
    const maxScores = {
        criticalThinking: 20,
        communicationSkills: 20,
        creativity: 20,
        adaptabilityFlexibility: 20
    };

    // Extract grades for each subject
    const analyse1 = grades["Analyse 1"] || 0;
    const algèbre1 = grades["Algèbre 1"] || 0;
    const algorithmes = grades["Algorithmes et structures de données 1"] || 0;
    const atelier = grades["Atelier de programmation 1"] || 0;
    const systèmes = grades["Systèmes logiques et architecture des ordinateurs"] || 0;
    const logique = grades["Logique formelle"] || 0;
    const anglais1 = grades["Anglais 1"] || 0;
    const technique = grades["Technique de communication 1"] || 0;
    const technologies = grades["Technologies multimédias"] || 0;
    const systèmesExploitation = grades["Systèmes d’exploitation 1"] || 0;

    // Calculate scores
    let totalScore = 0;

    // Calculate Critical Thinking Score (CTS)
    let cts = (parseInt(analyse1) + parseInt(algèbre1) + parseInt(algorithmes) + parseInt(atelier) + parseInt(systèmes) + parseInt(logique)) / 6;
    cts = (cts / maxScores.criticalThinking) * 100;
    totalScore += cts;

    // Calculate Communication Skills Score (CSS)
    let css = (parseInt(anglais1) + parseInt(technique)) / 2;
    css = (css / maxScores.communicationSkills) * 100;
    totalScore += css;

    // Calculate Creativity Score (CRS)
    let crs = parseInt(technologies);
    crs = (crs / maxScores.creativity) * 100;
    totalScore += crs;

    // Calculate Adaptability/Flexibility Score (AFS)
    let afs = parseInt(systèmesExploitation);
    afs = (afs / maxScores.adaptabilityFlexibility) * 100;
    totalScore += afs;

    // Log the scores
    console.log(`Critical Thinking Score (CTS): ${cts.toFixed(2)}`);
    console.log(`Communication Skills Score (CSS): ${css.toFixed(2)}`);
    console.log(`Creativity Score (CRS): ${crs.toFixed(2)}`);
    console.log(`Adaptability/Flexibility Score (AFS): ${afs.toFixed(2)}`);

    // Calculate and log the total score
    const overallScore = totalScore / 4;
    console.log(`Overall Score: ${overallScore.toFixed(2)}`);
}

function calculateScores0612(grades) {
    // Define the maximum scores for each category
    const maxScores = {
        criticalThinking: 20,
        communicationSkills: 20,
        creativity: 20,
        adaptabilityFlexibility: 20
    };

    // Extract grades for each subject
    const algèbre2 = grades["Algèbre 2"] || 0;
    const analyse2 = grades["Analyse 2"] || 0;
    const algorithmique = grades["Algorithmique, structure de données et complexité"] || 0;
    const atelier2 = grades["Atelier de Programmation 2"] || 0;
    const python = grades["Programmation Python"] || 0;
    const systèmes2 = grades["Systèmes d’exploitation 2"] || 0;
    const réseaux = grades["Fondements des réseaux"] || 0;
    const basesDonnées = grades["Fondements des bases de données"] || 0;
    const anglais2 = grades["Anglais 2"] || 0;
    const technique2 = grades["Technique de communication 2"] || 0;
    const compétencesNumériques = grades["Culture et Compétences Numériques"] || 0;

    // Calculate scores
    let totalScore = 0;

    // Calculate Critical Thinking Score (CTS)
    let cts = (parseInt(algèbre2) + parseInt(analyse2) + parseInt(algorithmique) + parseInt(atelier2) + parseInt(python)) / 5;
    cts = (cts / maxScores.criticalThinking) * 100;
    totalScore += cts;

    // Calculate Communication Skills Score (CSS)
    let css = (parseInt(anglais2) + parseInt(technique2)) / 2;
    css = (css / maxScores.communicationSkills) * 100;
    totalScore += css;

    // Calculate Creativity Score (CRS)
    let crs = (parseInt(réseaux) + parseInt(basesDonnées) + parseInt(compétencesNumériques)) / 3;
    crs = (crs / maxScores.creativity) * 100;
    totalScore += crs;

    // Calculate Adaptability/Flexibility Score (AFS)
    let afs = parseInt(systèmes2);
    afs = (afs / maxScores.adaptabilityFlexibility) * 100;
    totalScore += afs;

    // Log the scores
    console.log(`Critical Thinking Score (CTS): ${cts.toFixed(2)}`);
    console.log(`Communication Skills Score (CSS): ${css.toFixed(2)}`);
    console.log(`Creativity Score (CRS): ${crs.toFixed(2)}`);
    console.log(`Adaptability/Flexibility Score (AFS): ${afs.toFixed(2)}`);

    // Calculate and log the total score
    const overallScore = totalScore / 4;
    console.log(`Overall Score: ${overallScore.toFixed(2)}`);
}

function calculateScores0613(grades) {
    // Define the maximum scores for each category
    const maxScores = {
        criticalThinking: 20,
        communicationSkills: 20,
        creativity: 20,
        adaptabilityFlexibility: 20
    };

    // Extract grades for each subject
    const probabilité = grades["Probabilité et statistiques"] || 0;
    const langagesAutomates = grades["Théorie des langages et des Automates "] || 0;
    const graphesOptimisation = grades["Graphes et optimisation"] || 0;
    const conceptionSI = grades["Conception des Systèmes d'Information "] || 0;
    const java = grades["Programmation Java"] || 0;
    const ingénierieBasesDonnées = grades["Ingénierie des Bases de Données "] || 0;
    const réseaux = grades["Services des Réseaux"] || 0;
    const anglais3 = grades["Anglais 3"] || 0;
    const gestionEntreprise = grades["Gestion d’entreprise"] || 0;
    const python2 = grades["Programmation Python II"] || 0;

    // Calculate scores
    let totalScore = 0;

    // Calculate Critical Thinking Score (CTS)
    let cts = (parseInt(probabilité) + parseInt(langagesAutomates) + parseInt(graphesOptimisation) + parseInt(conceptionSI) + parseInt(java) + parseInt(ingénierieBasesDonnées) + parseInt(réseaux) + parseInt(anglais3) + parseInt(gestionEntreprise) + parseInt(python2)) / 10;
    cts = (cts / maxScores.criticalThinking) * 100;
    totalScore += cts;

    // Generate random scores for Communication Skills, Creativity, and Adaptability/Flexibility
    const css = Math.floor(Math.random() * (maxScores.communicationSkills + 1));
    const crs = Math.floor(Math.random() * (maxScores.creativity + 1));
    const afs = Math.floor(Math.random() * (maxScores.adaptabilityFlexibility + 1));

    // Log the scores
    console.log(`Critical Thinking Score (CTS): ${cts.toFixed(2)}`);
    console.log(`Communication Skills Score (CSS): ${css}`);
    console.log(`Creativity Score (CRS): ${crs}`);
    console.log(`Adaptability/Flexibility Score (AFS): ${afs}`);

    // Calculate and log the total score
    totalScore += css + crs + afs;
    const overallScore = totalScore / 4;
    console.log(`Overall Score: ${overallScore.toFixed(2)}`);
}

function calculateScores0614(grades) {
    // Define the maximum scores for each category
    const maxScores = {
        criticalThinking: 20,
        communicationSkills: 20,
        creativity: 20,
        adaptabilityFlexibility: 20
    };

    // Extract grades for each subject
    const entrepôts = grades["Entrepôts de données"] || 0;
    const administrationBases = grades["Administration des bases de données "] || 0;
    const indexationRecherche = grades["Techniques d'indexation et recherche multimédia"] || 0;
    const technologiesWeb = grades["Technologies et programmation web "] || 0;
    const techniquesCompilation = grades["Techniques de compilation"] || 0;
    const testsLogiciels = grades["Tests des logiciels (Certification ISTQB)"] || 0;
    const ia = grades["Fondements de l'intelligence artificielle (Programmation IA)"] || 0;
    const anglais4 = grades["Anglais 4"] || 0;
    const droitInformatique = grades["Droit informatique, protection des données et éthique"] || 0;
    const projetFédéré = grades["Projet fédéré (méthode Agile) "] || 0;

    // Calculate scores
    let totalScore = 0;

    // Calculate Critical Thinking Score (CTS)
    let cts = (parseInt(entrepôts) + parseInt(administrationBases) + parseInt(indexationRecherche) + parseInt(technologiesWeb) + parseInt(techniquesCompilation) + parseInt(testsLogiciels) + parseInt(ia) + parseInt(anglais4) + parseInt(droitInformatique) + parseInt(projetFédéré)) / 10;
    cts = (cts / maxScores.criticalThinking) * 100;
    totalScore += cts;

    // Generate random scores for Communication Skills, Creativity, and Adaptability/Flexibility
    const css = Math.floor(Math.random() * (maxScores.communicationSkills + 1));
    const crs = Math.floor(Math.random() * (maxScores.creativity + 1));
    const afs = Math.floor(Math.random() * (maxScores.adaptabilityFlexibility + 1));

    // Log the scores
    console.log(`Critical Thinking Score (CTS): ${cts.toFixed(2)}`);
    console.log(`Communication Skills Score (CSS): ${css}`);
    console.log(`Creativity Score (CRS): ${crs}`);
    console.log(`Adaptability/Flexibility Score (AFS): ${afs}`);

    // Calculate and log the total score
    totalScore += css + crs + afs;
    const overallScore = totalScore / 4;
    console.log(`Overall Score: ${overallScore.toFixed(2)}`);
}

function calculateScores0615(grades) {
    // Define the maximum scores for each category
    const maxScores = {
        criticalThinking: 20,
        communicationSkills: 20,
        creativity: 20,
        adaptabilityFlexibility: 20
    };

    // Extract grades for each subject
    const bigData = grades["Framework et technologies Big Data"] || 0;
    const virtualisationCloud = grades["Virtualisation et Cloud"] || 0;
    const devMobile = grades["Développement Mobile"] || 0;
    const devApplicationsRéparties = grades["Développement d'applications réparties"] || 0;
    const machineLearning = grades["Machine Learning"] || 0;
    const sécuritéInformatique = grades["Sécurité informatique"] || 0;
    const architectureSOA = grades["Architecture SOA et services web"] || 0;
    const anglais5 = grades["Anglais 5"] || 0;
    const entrepreneuriat = grades["Entrepreunariat"] || 0;
    const prepEnvironnementProfessionnel = grades["Préparation à l'environnement professionnel"] || 0;
    const architectureIOT = grades["Architecture IOT"] || 0;
    const applicationsIOT = grades["Applications IOT"] || 0;

    // Calculate scores
    let totalScore = 0;

    // Calculate Critical Thinking Score (CTS)
    let cts = (parseInt(bigData) + parseInt(virtualisationCloud) + parseInt(devMobile) + parseInt(devApplicationsRéparties) + parseInt(machineLearning) + parseInt(sécuritéInformatique) + parseInt(architectureSOA) + parseInt(anglais5) + parseInt(entrepreneuriat) + parseInt(prepEnvironnementProfessionnel) + parseInt(architectureIOT) + parseInt(applicationsIOT)) / 12;
    cts = (cts / maxScores.criticalThinking) * 100;
    totalScore += cts;

    // Generate random scores for Communication Skills, Creativity, and Adaptability/Flexibility
    const css = Math.floor(Math.random() * (maxScores.communicationSkills + 1));
    const crs = Math.floor(Math.random() * (maxScores.creativity + 1));
    const afs = Math.floor(Math.random() * (maxScores.adaptabilityFlexibility + 1));

    // Log the scores
    console.log(`Critical Thinking Score (CTS): ${cts.toFixed(2)}`);
    console.log(`Communication Skills Score (CSS): ${css}`);
    console.log(`Creativity Score (CRS): ${crs}`);
    console.log(`Adaptability/Flexibility Score (AFS): ${afs}`);

    // Calculate and log the total score
    totalScore += css + crs + afs;
    const overallScore = totalScore / 4;
    console.log(`Overall Score: ${overallScore.toFixed(2)}`);
}