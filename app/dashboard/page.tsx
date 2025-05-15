'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  LockIcon,
  Menu,
  LogOut,
  User,
  Settings,
  Award,
  MessageSquareText,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [moduleProgress, setModuleProgress] = useState({
    html: 30,
    css: 0,
    javascript: 0,
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);

      // Here you would fetch the user's progress from Supabase
      // For now, we'll use the mock data
    };

    getUser();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009c3b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/dashboard">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/profile">
                        <User className="mr-2 h-5 w-5" />
                        Perfil
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/achievements">
                        <Award className="mr-2 h-5 w-5" />
                        Conquistas
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/settings">
                        <Settings className="mr-2 h-5 w-5" />
                        Configurações
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Sair
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link
              href="/dashboard"
              className="text-2xl font-bold text-[#002776] hidden md:block"
            >
              Programin
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="text-2xl font-bold text-[#002776] md:hidden"
          >
            Programin
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link href="/ai-assistant">
                <MessageSquareText className="mr-2 h-4 w-4" />
                Aprenda com a IA
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/ai-assistant">
                <MessageSquareText className="h-5 w-5" />
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-[#009c3b] flex items-center justify-center text-white font-medium">
                    {user?.user_metadata?.username?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() ||
                      'U'}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/achievements">
                    <Award className="mr-2 h-4 w-4" />
                    Conquistas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#002776]">
            Olá, {user?.user_metadata?.username || 'Aluno'}
          </h1>
          <p className="text-gray-600">Continue sua jornada de aprendizado</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Seu Progresso</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">HTML</span>
                <span className="text-sm text-gray-500">
                  {moduleProgress.html}%
                </span>
              </div>
              <Progress value={moduleProgress.html} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">CSS</span>
                <span className="text-sm text-gray-500">
                  {moduleProgress.css}%
                </span>
              </div>
              <Progress value={moduleProgress.css} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">JavaScript</span>
                <span className="text-sm text-gray-500">
                  {moduleProgress.javascript}%
                </span>
              </div>
              <Progress value={moduleProgress.javascript} className="h-2" />
            </div>
          </div>
        </div>

        {/* Modules */}
        <h2 className="text-2xl font-bold mb-6 text-[#002776]">
          Módulos de Aprendizado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="bg-[#009c3b]/10 pb-2">
              <CardTitle className="text-[#009c3b]">HTML</CardTitle>
              <CardDescription>Fundamentos da estrutura web</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <img
                src="/placeholder.svg?height=150&width=300"
                alt="HTML Module"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm text-gray-500">
                  {moduleProgress.html}%
                </span>
              </div>
              <Progress value={moduleProgress.html} className="h-2 mb-4" />
              <p className="text-gray-600">
                Aprenda a criar a estrutura de páginas web com HTML, a linguagem
                de marcação fundamental para desenvolvimento web.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90"
                asChild
              >
                <Link href="/modules/html">
                  {moduleProgress.html > 0 ? 'Continuar' : 'Começar'}
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="bg-[#002776]/10 pb-2">
              <CardTitle className="text-[#002776]">CSS</CardTitle>
              <CardDescription>Estilização e design</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="CSS Module"
                  className="w-full h-40 object-cover rounded-md mb-4 opacity-60"
                />
                {moduleProgress.html < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LockIcon className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm text-gray-500">
                  {moduleProgress.css}%
                </span>
              </div>
              <Progress value={moduleProgress.css} className="h-2 mb-4" />
              <p className="text-gray-600">
                Aprenda a estilizar suas páginas web com CSS, dando vida e
                personalidade aos seus projetos.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={moduleProgress.html < 100}
                asChild={moduleProgress.html >= 100}
              >
                {moduleProgress.html < 100 ? (
                  <>
                    <LockIcon className="mr-2 h-4 w-4" /> Bloqueado
                  </>
                ) : (
                  <Link href="/modules/css">Começar</Link>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="bg-[#ffdf00]/20 pb-2">
              <CardTitle className="text-[#ffdf00]">JavaScript</CardTitle>
              <CardDescription>Interatividade e lógica</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=150&width=300"
                  alt="JavaScript Module"
                  className="w-full h-40 object-cover rounded-md mb-4 opacity-60"
                />
                {moduleProgress.css < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LockIcon className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm text-gray-500">
                  {moduleProgress.javascript}%
                </span>
              </div>
              <Progress
                value={moduleProgress.javascript}
                className="h-2 mb-4"
              />
              <p className="text-gray-600">
                Aprenda a adicionar interatividade às suas páginas com
                JavaScript, a linguagem de programação da web.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={moduleProgress.css < 100}
                asChild={moduleProgress.css >= 100}
              >
                {moduleProgress.css < 100 ? (
                  <>
                    <LockIcon className="mr-2 h-4 w-4" /> Bloqueado
                  </>
                ) : (
                  <Link href="/modules/javascript">Começar</Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Programin. Todos os direitos
                reservados.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/support"
                className="text-sm text-gray-600 hover:text-[#002776]"
              >
                Suporte
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-[#002776]"
              >
                Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-[#002776]"
              >
                Termos
              </Link>
              <Link
                href="/community"
                className="text-sm text-gray-600 hover:text-[#002776]"
              >
                Comunidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
