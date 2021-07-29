/**
 * Class wraps help static function which generates DOM nodes.
 * 
 * @author Jiri Hynek
 */
class TabDOMUtil {

    /**
     * Function generates select div node.
     * 
     * @param label 
     * @param id 
     * @param action 
     * @param options 
     */
    public static createSelectDiv(label: string, id: string, action: ((this: GlobalEventHandlers, ev: Event) => any) | null, options: string[]): HTMLDivElement {
        const div: HTMLDivElement = document.createElement('div');
        
        if(label != null) {
            div.appendChild(document.createTextNode(label + ": "));
        }
        div.appendChild(TabDOMUtil.createSelect(id, action, options, undefined));
        
        return div;
    }

    /**
     * Function generates select node.
     * 
     * @param id 
     * @param action 
     * @param options 
     * @param className 
     */
    public static createSelect(id: string, action: ((this: GlobalEventHandlers, ev: Event) => any) | null, options: string[], className: string | undefined): HTMLSelectElement {
        const select: HTMLSelectElement = document.createElement('select');
        
        select.setAttribute("id", id);
        if(className) {
            select.classList.add(className);
        }
        select.onchange = action;
        TabDOMUtil.appendOptions(select, options);
        
        return select;
    }

    /**
     * Function genearates option nodes.
     * 
     * @param select 
     * @param options 
     */
    public static appendOptions(select: HTMLSelectElement, options: string[]): void {
        let option: HTMLOptionElement;
        for(let i = 0; i < options.length; i++) {
            option = select.appendChild(document.createElement("option"));
            option.setAttribute("value", options[i]);
            option.innerHTML = options[i];
        }
    }

    /**
     * Function generates input text node.
     * 
     * @param size 
     * @param className 
     */
    public static createTextInput(size: string | undefined, className: string | undefined): HTMLInputElement {
        const input: HTMLInputElement = document.createElement('input');
        
        input.setAttribute("type", "text");
        if(size) {
            input.setAttribute("size", size);
        }
        if(className) {
            input.classList.add(className);
        }

        return input;
    }

    /**
     * Function generates button node.
     * 
     * @param label 
     * @param action 
     * @param id
     */
    public static createButton(label: string, action: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, id: string): HTMLButtonElement {
        const btn: HTMLButtonElement = document.createElement('button');
        
        btn.setAttribute("type", "button");
        btn.setAttribute("id", id);
        btn.innerHTML = label;
        btn.onclick = action;
        
        return btn;
    }

    /**
     * Function generates label heading node.
     * 
     * @param label 
     */
    public static createSidebarHeading(label: string): HTMLElement {
        const heading = document.createElement('strong');
        heading.innerHTML = label;
        return heading;
    }


    /**
     * Sets multiple element attributes.
     *
     * @param element 
     * @param keyArray 
     * @param valueArray
     */
    public static setAttributes(element: HTMLElement, keyArray: string[], valueArray: string[]): void {
        if (keyArray.length == valueArray.length) {
            for (let i = keyArray.length - 1; i >= 0; i--) {
                element.setAttribute(keyArray[i], valueArray[i]);
            }
        }
    }
}

export default TabDOMUtil;