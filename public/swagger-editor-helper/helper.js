!function (w, d) {
    d.addEventListener("DOMContentLoaded", function () {
        var editorElement = d.getElementById("swagger-editor");
        if (!editorElement) {
            return;
        }

        function toggleEditor(show) {
            editorElement.classList[show ? "remove" : "add"]("hide-editor");
            w.localStorage.setItem("swagger-editor", show ? "on" : "off");
        }

        function initialToggleButton() {
            var editBar = d.querySelector("#swagger-editor .topbar-wrapper"), emptyHref = "javascript:",
                previewBar, logoLink, previewButton, editButton;
            previewBar = d.createElement("div");
            previewButton = d.createElement("div");
            editButton = d.createElement("div");

            editBar.classList.add("edit-menu");
            editBar.parentNode.appendChild(previewBar);
            editBar.appendChild(previewButton);

            previewBar.className = "topbar-wrapper preview-menu";
            logoLink = d.createElement("a");
            previewBar.appendChild(logoLink);
            previewBar.appendChild(editButton);

            logoLink.className = "link";
            logoLink.href = emptyHref;
            logoLink.innerHTML = d.querySelector(".edit-menu .link").innerHTML;

            previewButton.className = "dd-menu dd-menu-right button";
            previewButton.innerHTML = "Preview";
            previewButton.addEventListener("click", function () {
                toggleEditor(false);
            });
            editButton.className = "dd-menu dd-menu-right button";
            editButton.innerHTML = "Edit";
            editButton.addEventListener("click", function () {
                toggleEditor(true);
            });
        }

        function waitForEditor() {
            if (d.querySelector(".topbar-wrapper .link")) {
                initialToggleButton();
            } else {
                waitingCounter++;
                if (waitingCounter < 100) {
                    setTimeout(waitForEditor, 20);
                } else {
                    w.console && console.error("Swagger editor not ready");
                }
            }
        }

        function foreach(list, callback) {
            [].forEach.call(list, callback);
        }

        // Set default status from local storage
        var currentStatus = (w.localStorage.getItem("swagger-editor") === "on");
        toggleEditor(currentStatus);

        // Wait for the editor initialization
        // Sorry I don't know if there is any handlers provided by swagger, so I just wait for the editor object
        var waitingCounter = 0;
        waitForEditor();
    });
}(window, document);
