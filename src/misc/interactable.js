import interact from 'interactjs';

export function makeInteractable(movingEl, parent, onMove) {


    interact(movingEl)
        .draggable({
            listeners: {
                move: onMove
            },
            inertia: false,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: parent,
                    elementRect: { left: 0, right: 0, top: 1, bottom: 1 },
                })
            ]
        })
}