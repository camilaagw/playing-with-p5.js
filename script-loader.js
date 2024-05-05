const projects = [
    { name: "Project 1", file: "project1.js" },
    { name: "Project 2", file: "project2.js" },
    // Add more projects here
];

function loadProject(projectFile) {
    const scriptTag = document.createElement('script');
    scriptTag.src = projectFile;
    scriptTag.onload = () => console.log(`${projectFile} loaded successfully.`);
    scriptTag.onerror = () => console.error(`Failed to load ${projectFile}`);
    document.body.appendChild(scriptTag);
}

function populateProjects() {
    const list = document.getElementById('project-list');
    projects.forEach(project => {
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = project.name;
        link.onclick = () => loadProject(project.file);
        list.appendChild(link);
    });
}

document.addEventListener('DOMContentLoaded', populateProjects);
