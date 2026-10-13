"use strict";

const notebookSections = [
  "Temas aprendidos",
  "Ejercicios de laboratorio y resultados",
  "Reflexión semanal"
];

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderInline(markdown) {
  const tokens = [];
  const saveToken = html => {
    const marker = `MARKDOWNTOKEN${tokens.length}END`;
    tokens.push(html);
    return marker;
  };

  let text = markdown.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) => {
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return match;
    }
    if (!["http:", "https:", "mailto:"].includes(url.protocol)) return match;
    const safeHref = escapeHtml(href);
    const target = ["http:", "https:"].includes(url.protocol)
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    return saveToken(`<a href="${safeHref}"${target}>${renderInline(label)}</a>`);
  });
  text = text.replace(/`([^`]+)`/g, (match, code) => saveToken(`<code>${escapeHtml(code)}</code>`));
  text = text.replace(/\*\*([^*]+)\*\*/g, (match, bold) => saveToken(`<strong>${escapeHtml(bold)}</strong>`));
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, (match, emphasis) => saveToken(`<em>${escapeHtml(emphasis)}</em>`));
  text = escapeHtml(text);
  return text.replace(/MARKDOWNTOKEN(\d+)END/g, (match, index) => tokens[Number(index)]);
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let listType = "";

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      html.push(`<${listType}>${list.map(item => `<li>${renderInline(item)}</li>`).join("")}</${listType}>`);
      list = [];
      listType = "";
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const item = trimmed.match(/^(?:(\d+)\.\s+|-\s+)(.+)$/);

    if (!trimmed) {
      flushParagraph();
      flushList();
    } else if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      if (level >= 3) html.push(`<h4>${renderInline(heading[2])}</h4>`);
    } else if (item) {
      flushParagraph();
      const nextListType = item[1] ? "ol" : "ul";
      if (listType && listType !== nextListType) flushList();
      listType = nextListType;
      list.push(item[2]);
    } else {
      flushList();
      paragraph.push(trimmed);
    }
  }
  flushParagraph();
  flushList();
  return html.join("\n");
}

function parseWeekMarkdown(markdown) {
  const sections = new Map(notebookSections.map(section => [section, []]));
  const preamble = [];
  let currentSection = "";
  let topic = "";

  for (const line of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    const heading = line.trim().match(/^##\s+(.+)$/);
    if (heading) {
      currentSection = sections.has(heading[1]) ? heading[1] : "";
      continue;
    }
    const topicLine = line.match(/^\*\*Fecha o tema principal:\*\*\s*(.+)$/);
    if (topicLine) {
      topic = topicLine[1].trim();
      continue;
    }
    if (currentSection) sections.get(currentSection).push(line);
    else if (!line.trim().startsWith("# ")) preamble.push(line);
  }

  if (!topic) throw new Error("No se encontró el tema principal del registro.");
  for (const section of notebookSections) {
    if (!sections.get(section).some(line => line.trim())) {
      throw new Error(`No se encontró la sección «${section}».`);
    }
  }

  return { topic, preamble: preamble.join("\n").trim(), sections };
}

async function loadWeek(notebook) {
  const week = notebook.dataset.weekContent;
  const url = `../semanas/semana-${week}.md`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${url} (HTTP ${response.status}).`);
    }
    const markdown = await response.text();
    const content = parseWeekMarkdown(markdown);
    const panel = notebook.closest(".tab-panel");
    panel.querySelector("[data-week-topic]").innerHTML = renderInline(content.topic);
    const topics = notebook.querySelector('[data-section="Temas aprendidos"]');
    topics.innerHTML = content.preamble
      ? `${renderMarkdown(content.preamble)}\n${renderMarkdown(content.sections.get("Temas aprendidos").join("\n"))}`
      : renderMarkdown(content.sections.get("Temas aprendidos").join("\n"));
    for (const section of notebookSections.slice(1)) {
      const sectionContent = content.sections.get(section).join("\n");
      const rendered = section === "Reflexión semanal"
        ? sectionContent
            .split("\n")
            .map(line => line.trim().match(/^-\s+(.+)$/))
            .filter(Boolean)
            .map(([, text]) => `<p>${renderInline(text)}</p>`)
            .join("\n")
        : renderMarkdown(sectionContent);
      notebook.querySelector(`[data-section="${section}"]`).innerHTML = rendered;
    }
    notebook.setAttribute("aria-busy", "false");
  } catch (error) {
    notebook.setAttribute("aria-busy", "false");
    const message = error instanceof Error ? error.message : String(error);
    notebook.innerHTML = `<p role="alert">Error al cargar el registro de la semana ${week}: ${escapeHtml(message)}. Abre el portafolio mediante Live Server o GitHub Pages para permitir la lectura de los archivos Markdown.</p>`;
  }
}

document.querySelectorAll("[data-week-content]").forEach(loadWeek);
