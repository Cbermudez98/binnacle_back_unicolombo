import Logger from "../utils/Logger";

export class EmailTemplate {
    static builder(template: string, variables: { name: string, value: string }[]): string {
        let newTemplate = template;
        for(const variable of variables) {
            newTemplate = newTemplate.replace(variable.name, variable.value);
        }
        return newTemplate;
    }
}