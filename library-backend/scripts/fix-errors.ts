import { Project, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

function fixFile(filePath: string) {
  const sourceFile = project.getSourceFile(filePath);
  if (!sourceFile) return;

  // 1. Fix imports pointing to missing files. 
  // e.g. import { ... } from './create-id-card.dto' -> './id-cards-create-id-card.dto'
  const importDeclarations = sourceFile.getImportDeclarations();
  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const modulePath = importDecl.getModuleSpecifierSourceFile()?.getFilePath();
    if (!modulePath) {
      // The module cannot be found, let's try to fix it by checking adjacent files
      const dir = sourceFile.getDirectoryPath();
      let resolvedDir: string = dir as any;
      let basename = moduleSpecifier;
      
      if (moduleSpecifier.startsWith('../dto/')) {
        resolvedDir = path.join(dir as any, '../dto');
        basename = moduleSpecifier.replace('../dto/', '');
      } else if (moduleSpecifier.startsWith('../services/')) {
        resolvedDir = path.join(dir as any, '../services');
        basename = moduleSpecifier.replace('../services/', '');
      } else if (moduleSpecifier.startsWith('./controllers/')) {
        resolvedDir = path.join(dir as any, 'controllers');
        basename = moduleSpecifier.replace('./controllers/', '');
      } else if (moduleSpecifier.startsWith('./services/')) {
        resolvedDir = path.join(dir as any, 'services');
        basename = moduleSpecifier.replace('./services/', '');
      } else if (moduleSpecifier.startsWith('./')) {
        basename = moduleSpecifier.replace('./', '');
      }

      // Read dir and find a file that ends with basename + '.ts'
      if (fs.existsSync(resolvedDir)) {
        const files = fs.readdirSync(resolvedDir);
        const match = files.find(f => f.endsWith(`-${basename}.ts`));
        if (match) {
          const newModuleSpecifier = moduleSpecifier.replace(basename, match.replace('.ts', ''));
          importDecl.setModuleSpecifier(newModuleSpecifier);
          console.log(`Fixed import in ${filePath}: ${moduleSpecifier} -> ${newModuleSpecifier}`);
        }
      }
    }
  }

  // 2. Fix PartialType(Create...Dto) -> PartialType(ImportedCreateDtoName)
  const classDeclarations = sourceFile.getClasses();
  for (const cls of classDeclarations) {
    const extendsClause = cls.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
    if (extendsClause) {
      const typeNodes = extendsClause.getTypeNodes();
      for (const typeNode of typeNodes) {
        const text = typeNode.getText();
        if (text.startsWith('PartialType(')) {
          const innerMatch = text.match(/PartialType\((Create[A-Za-z0-9]*Dto)\)/);
          if (innerMatch) {
            // Find the import that matches *Create*Dto
            const imports = sourceFile.getImportDeclarations();
            let replacement = null;
            for (const imp of imports) {
              for (const named of imp.getNamedImports()) {
                if (named.getName().includes('Create') && named.getName().includes('Dto')) {
                  replacement = named.getName();
                }
              }
            }
            if (replacement) {
              const newText = `PartialType(${replacement})`;
              typeNode.replaceWithText(newText);
              console.log(`Fixed PartialType in ${filePath}: ${text} -> ${newText}`);
            }
          }
        }
      }
    }
  }

  sourceFile.saveSync();
}

const sourceFiles = project.getSourceFiles();
for (const sf of sourceFiles) {
  fixFile(sf.getFilePath());
}

console.log('Done!');
