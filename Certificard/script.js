const $projectsRoot = document.querySelector('#_projects_');
const $projectsList = $projectsRoot.querySelectorAll('.project-card');
const $projectsCheckBox = document.getElementsByName('projects');
// Muda o tema
function mudarTema() {
  // Tema Geral
  let atual = "light", troca = "dark";
  if (document.body.classList.contains('dark')) {
    atual = "dark";
    troca = "light";
  }
  document.body.classList.replace(atual, troca);
  // Tema Codepen
  for (let $project of $projectsList) {
    let $codePenFrame = $project.querySelector('.cp_embed_iframe');
    if ($codePenFrame != null)
      $codePenFrame.src = $codePenFrame.src.replace(`theme-id=${atual}`, `theme-id=${troca}`);
  }
}

// Muda o modo de visualização
function mudaVisualizacao() {
  let actualMode = "projects-list", newMode = "projects-grid";
  if ($projectsRoot.classList.contains(newMode)) {
    newMode = "projects-list";
    actualMode = "projects-grid";
  }
  $projectsRoot.classList.replace(actualMode, newMode);
  resetInputCheck();
}

//Desceleciona todos os inputs
function resetInputCheck() {
  $projectsCheckBox.forEach((el) => el.checked = false );
}

//Atualiza o tamanho do card
function updateCardSize(event) {
  let $input = event.target;
  let zoomRatio = ($input.value > $input.max || $input.value < $input.min)? 1 : $input.value;
  let cardWidth = 260 * zoomRatio, cardHeight = 260 * zoomRatio;
  let cardBase = (zoomRatio > 1)? 900 : 600;
  let cardRatio = cardWidth / cardBase;
  $projectsRoot.style.setProperty('--card-width', `${cardWidth}px`);
  $projectsRoot.style.setProperty('--card-height', `${cardHeight}px`);
  $projectsRoot.style.setProperty('--card-scale', `${cardRatio}`);

}