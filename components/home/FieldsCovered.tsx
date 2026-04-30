import { 
  Telescope, 
  Dna, 
  FlaskConical, 
  Laptop, 
  Briefcase, 
  TrendingUp, 
  Scale, 
  Leaf, 
  Landmark, 
  BookOpen, 
  CheckCircle, 
  BrainCircuit, 
  Church,
  Settings,
  Stethoscope,
  Calculator,
  Atom,
  Library,
  Feather,
  Users
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const fields = [
  { name: "Astrophysics", icon: Telescope },
  { name: "Biology", icon: Dna },
  { name: "Chemistry", icon: FlaskConical },
  { name: "Computing", icon: Laptop },
  { name: "Engineering", icon: Settings },
  { name: "Medicine", icon: Stethoscope },
  { name: "Mathematics", icon: Calculator },
  { name: "Physics", icon: Atom },
  { name: "CV & Resume", icon: Briefcase },
  { name: "Economics", icon: TrendingUp },
  { name: "Law", icon: Scale },
  { name: "Life Science", icon: Leaf },
  { name: "Political Science", icon: Landmark },
  { name: "Sociology", icon: Users },
  { name: "History", icon: Library },
  { name: "Literature", icon: Feather },
  { name: "MLA Formatting", icon: BookOpen },
  { name: "Reference Checks", icon: CheckCircle },
  { name: "Psychology", icon: BrainCircuit },
  { name: "Theology", icon: Church },
];

export function FieldsCovered() {
  return (
    <section className="bg-paper py-32 px-5 sm:px-10 border-b border-ink/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-screen-xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight">Specialized Fields</h2>
            <p className="mt-6 text-ink/70 text-lg leading-relaxed">
              Our editors hold advanced degrees across dozens of disciplines, ensuring your document is reviewed by a true subject-matter expert.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {fields.map((field, idx) => (
            <Reveal key={field.name} delay={idx * 0.03}>
              <div className="flex flex-col items-center justify-center p-8 bg-charcoal border border-ink/10 rounded-2xl hover:border-gold/30 hover:bg-ink transition-all duration-300 group h-full shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <field.icon className="w-8 h-8 text-gold/80 mb-4 group-hover:scale-110 group-hover:text-gold transition-all duration-300" strokeWidth={1.5} />
                <span className="text-sm font-medium text-ivory/80 text-center group-hover:text-ivory transition-colors">{field.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
