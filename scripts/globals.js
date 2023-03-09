// selectors
const rightPanelSelector =              "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w";
const codePanelSelector =               "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div.relative.flex.h-full.flex-col";

const consoleButtonSelector =           "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div > div:nth-child(3) > div > div > div > div > div > div.mr-2.flex.flex-1.flex-nowrap.items-center.space-x-4 > button";
const consoleButtonSelectorPostRun =    "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div:nth-child(1) > div > div:nth-child(3) > div > div > div:nth-child(3) > div > div > div.mr-2.flex.flex-1.flex-nowrap.items-center.space-x-4 > button";
const consoleButtonSelectorPostSubmit = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div:nth-child(1) > div > div:nth-child(3) > div > div > div > div > div > div.mr-2.flex.flex-1.flex-nowrap.items-center.space-x-4 > button";

const problemTextSelector =             "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto > div > div > div:nth-child(3) > div";
const solutionTextSelector =            "#editor > div.flex.flex-1.flex-col.overflow-hidden > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs-dark > div.lines-content.monaco-editor-background > div.view-lines.monaco-mouse-cursor-text";
const solutionTextSelector2 =           "#editor > div.flex.flex-1.flex-col.overflow-hidden > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs > div.lines-content.monaco-editor-background > div.view-lines.monaco-mouse-cursor-text";

const runButtonSelector =               "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div > div:nth-child(3) > div > div > div > div > div > div.ml-auto.flex.items-center.space-x-4 > button.px-3.py-1\\.5.font-medium.items-center.whitespace-nowrap.transition-all.focus\\:outline-none.inline-flex.bg-fill-3.dark\\:bg-dark-fill-3.hover\\:bg-fill-2.dark\\:hover\\:bg-dark-fill-2.text-label-2.dark\\:text-dark-label-2.rounded-lg";
const submitButtonSelector =            "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div > div:nth-child(3) > div > div > div > div > div > div.ml-auto.flex.items-center.space-x-4 > button.px-3.py-1\\.5.font-medium.items-center.whitespace-nowrap.transition-all.focus\\:outline-none.inline-flex.text-label-r.bg-green-s.dark\\:bg-dark-green-s.hover\\:bg-green-3.dark\\:hover\\:bg-dark-green-3.rounded-lg";
// html
const resizeIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 2" width="14" height="2" fill="currentColor" class="transition text-gray-3 dark:text-dark-gray-3 group-hover:text-white dark:group-hover:text-white"><circle r="1" transform="matrix(-1 0 0 1 1 1)"></circle><circle r="1" transform="matrix(-1 0 0 1 7 1)"></circle><circle r="1" transform="matrix(-1 0 0 1 13 1)"></circle></svg>`;
const svgOpenHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="fill-gray-6 text-[20px] dark:fill-dark-gray-6">';
const pathHtml = '<path fill-rule="evenodd" d="M16.293 14.707a1 1 0 001.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 101.414 1.414L12 10.414l4.293 4.293z" clip-rule="evenodd"></path>';
const svgCloseHtml = '</svg>';

// ui vars
let codeHeightSetting = "70%";
let chatHeightSetting = "30%";
let chatIsOpen = false;
