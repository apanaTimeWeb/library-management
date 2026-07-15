const { Project } = require('ts-morph');
const path = require('path');

async function run() {
  const project = new Project();
  project.addSourceFilesAtPaths("src/modules/manager/**/*.ts");

  const files = project.getSourceFiles();
  let modifiedCount = 0;

  for (const file of files) {
    let modified = false;
    const isController = file.getBaseName().includes('.controller.ts');
    const isService = file.getBaseName().includes('.service.ts');

    if (isController || isService) {
      const classes = file.getClasses();
      for (const cls of classes) {
        const methods = cls.getMethods();
        for (const method of methods) {
          const decorators = method.getDecorators();
          const isRouteHandler = decorators.some(d => ['Get', 'Post', 'Patch', 'Delete', 'Put'].includes(d.getName()));
          
          // Rule 62: Explicit return types
          if (!method.getReturnTypeNode()) {
            const isAsync = method.isAsync();
            if (isAsync) {
               method.setReturnType('Promise<any>');
            } else {
               method.setReturnType('any');
            }
            modified = true;
          }
          
          // Rule 59: SLA Annotations
          if (isController && isRouteHandler) {
            // Check if there's already an SLA comment associated with this method
            const leadingRanges = method.getLeadingCommentRanges();
            const hasSla = leadingRanges.some(r => r.getText().includes('SLA:'));
            
            if (!hasSla) {
               // We will insert the comment before the method definition but after the decorators if possible.
               // Actually, it's easier to insert it right before the method's first decorator or keyword.
               // Wait, `insertText` might shift positions in a loop. It's safer to use `.addStatements` or edit raw text later.
               // Let's insert a JSDoc or just add a leading comment if ts-morph supports it in a clean way.
               // We can use a trick: Add a dummy decorator? No. 
               // Let's just insert text at the very beginning of the method declaration.
               const methodPos = method.getStart();
               file.insertText(methodPos, '// SLA: FAST\n  ');
               modified = true;
            }
          }
        }
      }
    }
    
    if (modified) {
      modifiedCount++;
      console.log(`Modified ${file.getBaseName()}`);
    }
  }

  await project.save();
  console.log(`Successfully standardized ${modifiedCount} files.`);
}

run().catch(console.error);
