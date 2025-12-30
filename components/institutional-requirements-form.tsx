"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  ChevronLeft,
  UtensilsCrossed,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

type FormData = {
  // Objetivo do Site
  objetivoPrincipal: string;
  funcionalidades: string[];
  tipoEstabelecimento: string;
  nomeEstabelecimento: string;

  // Cardápio/Produtos
  temCardapio: string;
  quantidadeItens: string;
  categoriasCardapio: string;
  temFotosComidas: string;
  descricaoDetalhada: string;

  // Sistema de Pedidos
  querPedidosOnline: string;
  tipoPedido: string[];
  formasPagamento: string;
  temEntrega: string;
  areaEntrega: string;

  // Identidade Visual
  coresPreferidas: string;
  estiloVisual: string;
  temLogo: string;
  referenciasVisuais: string;

  // Informações do Estabelecimento
  temHistoria: string;
  historiaTexto: string;
  diferenciais: string;
  horarioFuncionamento: string;

  // Localização e Contato
  endereco: string;
  telefone: string;
  redesSociais: string;
  precisaMapa: string;

  // Avaliações e Feedbacks
  temAvaliacoes: string;
  tiposAvaliacoes: string[];
  quantidadeAvaliacoes: string;

  // Sistema de Gestão (CRM)
  precisaCRM: string;
  funcionalidadesCRM: string[];
  integracoes: string;

  // CTAs e Conversão
  ctaPrincipal: string;
  outrosDesejos: string;
  observacoes: string;
};

const initialFormData: FormData = {
  objetivoPrincipal: "",
  funcionalidades: [],
  tipoEstabelecimento: "",
  nomeEstabelecimento: "",
  temCardapio: "",
  quantidadeItens: "",
  categoriasCardapio: "",
  temFotosComidas: "",
  descricaoDetalhada: "",
  querPedidosOnline: "",
  tipoPedido: [],
  formasPagamento: "",
  temEntrega: "",
  areaEntrega: "",
  coresPreferidas: "",
  estiloVisual: "",
  temLogo: "",
  referenciasVisuais: "",
  temHistoria: "",
  historiaTexto: "",
  diferenciais: "",
  horarioFuncionamento: "",
  endereco: "",
  telefone: "",
  redesSociais: "",
  precisaMapa: "",
  temAvaliacoes: "",
  tiposAvaliacoes: [],
  quantidadeAvaliacoes: "",
  precisaCRM: "",
  funcionalidadesCRM: [],
  integracoes: "",
  ctaPrincipal: "",
  outrosDesejos: "",
  observacoes: "",
};

export function FoodBusinessRequirementsForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 10;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFormData(field, newArray);
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / totalSteps) * 100;

  const downloadResults = () => {
    const results = `
# LEVANTAMENTO DE REQUISITOS - ESTABELECIMENTO DE COMIDA
# Data: ${new Date().toLocaleDateString("pt-BR")}

═══════════════════════════════════════════════════════════════

## 1. INFORMAÇÕES BÁSICAS
Nome do Estabelecimento: ${formData.nomeEstabelecimento}
Tipo de Estabelecimento: ${formData.tipoEstabelecimento}
Objetivo Principal do Site: ${formData.objetivoPrincipal}
Funcionalidades Desejadas: ${formData.funcionalidades.join(", ")}

═══════════════════════════════════════════════════════════════

## 2. CARDÁPIO / MENU
Tem Cardápio Pronto?: ${formData.temCardapio}
${
  formData.temCardapio === "sim"
    ? `Quantidade Aproximada de Itens: ${formData.quantidadeItens}\n`
    : ""
}
Categorias do Cardápio: ${formData.categoriasCardapio}
Tem Fotos dos Produtos?: ${formData.temFotosComidas}
Precisa de Descrição Detalhada?: ${formData.descricaoDetalhada}

═══════════════════════════════════════════════════════════════

## 3. SISTEMA DE PEDIDOS
Quer Pedidos Online?: ${formData.querPedidosOnline}
${
  formData.querPedidosOnline === "sim"
    ? `Tipos de Pedido: ${formData.tipoPedido.join(", ")}\n`
    : ""
}
Formas de Pagamento: ${formData.formasPagamento}
Tem Entrega?: ${formData.temEntrega}
${
  formData.temEntrega === "sim"
    ? `Área de Entrega: ${formData.areaEntrega}\n`
    : ""
}

═══════════════════════════════════════════════════════════════

## 4. IDENTIDADE VISUAL
Cores Preferidas: ${formData.coresPreferidas}
Estilo Visual Desejado: ${formData.estiloVisual}
Tem Logo?: ${formData.temLogo}
Referências Visuais: ${formData.referenciasVisuais || "Nenhuma"}

═══════════════════════════════════════════════════════════════

## 5. INFORMAÇÕES DO ESTABELECIMENTO
Tem História para Contar?: ${formData.temHistoria}
${
  formData.temHistoria === "sim" ? `História:\n${formData.historiaTexto}\n` : ""
}
Principais Diferenciais: ${formData.diferenciais}
Horário de Funcionamento: ${formData.horarioFuncionamento}

═══════════════════════════════════════════════════════════════

## 6. LOCALIZAÇÃO E CONTATO
Endereço: ${formData.endereco}
Telefone: ${formData.telefone}
Redes Sociais: ${formData.redesSociais}
Precisa de Mapa Integrado?: ${formData.precisaMapa}

═══════════════════════════════════════════════════════════════

## 7. AVALIAÇÕES E FEEDBACKS
Tem Avaliações de Clientes?: ${formData.temAvaliacoes}
${
  formData.temAvaliacoes === "sim"
    ? `Tipos: ${formData.tiposAvaliacoes.join(", ")}\n`
    : ""
}
${
  formData.temAvaliacoes === "sim"
    ? `Quantidade: ${formData.quantidadeAvaliacoes}\n`
    : ""
}

═══════════════════════════════════════════════════════════════

## 8. SISTEMA DE GESTÃO (CRM)
Precisa de Sistema de Gestão?: ${formData.precisaCRM}
${
  formData.precisaCRM === "sim"
    ? `Funcionalidades CRM: ${formData.funcionalidadesCRM.join(", ")}\n`
    : ""
}
Integrações Necessárias: ${formData.integracoes || "Nenhuma"}

═══════════════════════════════════════════════════════════════

## 9. CTAs E EXTRAS
CTA Principal: ${formData.ctaPrincipal}
Outros Desejos/Funcionalidades: ${formData.outrosDesejos || "Nenhum"}

═══════════════════════════════════════════════════════════════

## 10. OBSERVAÇÕES FINAIS
${formData.observacoes || "Nenhuma observação adicional"}

═══════════════════════════════════════════════════════════════

FIM DO LEVANTAMENTO
    `.trim();

    const blob = new Blob([results], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `levantamento-estabelecimento-comida-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendToWhatsApp = () => {
    const message = `*LEVANTAMENTO DE REQUISITOS - ESTABELECIMENTO DE COMIDA*
*Data:* ${new Date().toLocaleDateString("pt-BR")}

═══════════════════════════════════════

*1. INFORMAÇÕES BÁSICAS*
Nome: ${formData.nomeEstabelecimento || "Não informado"}
Tipo: ${formData.tipoEstabelecimento || "Não informado"}
Objetivo: ${formData.objetivoPrincipal || "Não informado"}
Funcionalidades: ${formData.funcionalidades.join(", ") || "Nenhuma"}

═══════════════════════════════════════

*2. CARDÁPIO*
Tem Cardápio: ${formData.temCardapio || "Não informado"}
${
  formData.temCardapio === "sim"
    ? `Quantidade de Itens: ${formData.quantidadeItens}\n`
    : ""
}Categorias: ${formData.categoriasCardapio || "Não informado"}
Tem Fotos: ${formData.temFotosComidas || "Não informado"}
Descrição Detalhada: ${formData.descricaoDetalhada || "Não informado"}

═══════════════════════════════════════

*3. PEDIDOS ONLINE*
Quer Pedidos Online: ${formData.querPedidosOnline || "Não informado"}
${
  formData.querPedidosOnline === "sim"
    ? `Tipos: ${formData.tipoPedido.join(", ")}\n`
    : ""
}Pagamento: ${formData.formasPagamento || "Não informado"}
Tem Entrega: ${formData.temEntrega || "Não informado"}
${
  formData.temEntrega === "sim"
    ? `Área de Entrega: ${formData.areaEntrega}\n`
    : ""
}

═══════════════════════════════════════

*4. IDENTIDADE VISUAL*
Cores: ${formData.coresPreferidas || "Não informado"}
Estilo: ${formData.estiloVisual || "Não informado"}
Tem Logo: ${formData.temLogo || "Não informado"}
Referências: ${formData.referenciasVisuais || "Nenhuma"}

═══════════════════════════════════════

*5. SOBRE O ESTABELECIMENTO*
Tem História: ${formData.temHistoria || "Não informado"}
${
  formData.temHistoria === "sim" ? `História: ${formData.historiaTexto}\n` : ""
}Diferenciais: ${formData.diferenciais || "Não informado"}
Horário: ${formData.horarioFuncionamento || "Não informado"}

═══════════════════════════════════════

*6. LOCALIZAÇÃO E CONTATO*
Endereço: ${formData.endereco || "Não informado"}
Telefone: ${formData.telefone || "Não informado"}
Redes Sociais: ${formData.redesSociais || "Não informado"}
Precisa Mapa: ${formData.precisaMapa || "Não informado"}

═══════════════════════════════════════

*7. AVALIAÇÕES*
Tem Avaliações: ${formData.temAvaliacoes || "Não informado"}
${
  formData.temAvaliacoes === "sim"
    ? `Tipos: ${formData.tiposAvaliacoes.join(", ")}\n`
    : ""
}${
      formData.temAvaliacoes === "sim"
        ? `Quantidade: ${formData.quantidadeAvaliacoes}\n`
        : ""
    }

═══════════════════════════════════════

*8. CRM / GESTÃO*
Precisa CRM: ${formData.precisaCRM || "Não informado"}
${
  formData.precisaCRM === "sim"
    ? `Funcionalidades: ${formData.funcionalidadesCRM.join(", ")}\n`
    : ""
}Integrações: ${formData.integracoes || "Nenhuma"}

═══════════════════════════════════════

*9. CTAs E EXTRAS*
CTA Principal: ${formData.ctaPrincipal || "Não informado"}
Outros Desejos: ${formData.outrosDesejos || "Nenhum"}

═══════════════════════════════════════

*10. OBSERVAÇÕES*
${formData.observacoes || "Nenhuma"}

═══════════════════════════════════════

*FIM DO LEVANTAMENTO*`;

    const phoneNumber = "5569993881869";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-green-500">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Levantamento Concluído!</CardTitle>
            <CardDescription>
              Todas as informações foram coletadas com sucesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-semibold mb-2">Próximos Passos:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                <li>Envie o levantamento via WhatsApp</li>
                <li>Baixe o arquivo com todas as respostas</li>
                <li>Analise os requisitos e prepare a proposta</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={sendToWhatsApp}
                size="lg"
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar via WhatsApp
              </Button>
              <Button
                onClick={downloadResults}
                size="lg"
                className="w-full cursor-pointer"
              >
                Baixar Levantamento Completo
              </Button>
              <Button
                onClick={() => {
                  setStep(1);
                  setIsComplete(false);
                  setFormData(initialFormData);
                }}
                variant="outline"
                size="lg"
                className="w-full cursor-pointer"
              >
                Fazer Novo Levantamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <UtensilsCrossed className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold">
            Levantamento - Estabelecimento de Comida
          </h1>
        </div>
        <p className="text-slate-600">
          Formulário para entender as necessidades do seu negócio
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Etapa {step} de {totalSteps}
          </span>
          <span className="text-sm text-slate-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Informações Básicas"}
            {step === 2 && "Cardápio / Menu"}
            {step === 3 && "Sistema de Pedidos Online"}
            {step === 4 && "Identidade Visual"}
            {step === 5 && "Sobre o Estabelecimento"}
            {step === 6 && "Localização e Contato"}
            {step === 7 && "Avaliações e Feedbacks"}
            {step === 8 && "Sistema de Gestão (CRM)"}
            {step === 9 && "CTAs e Conversão"}
            {step === 10 && "Observações Finais"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Qual o nome e tipo do seu estabelecimento?"}
            {step === 2 && "Informações sobre seu cardápio e produtos"}
            {step === 3 && "Como os clientes vão fazer pedidos?"}
            {step === 4 && "Cores, estilo e identidade da marca"}
            {step === 5 && "História e diferenciais do negócio"}
            {step === 6 && "Como os clientes podem te encontrar?"}
            {step === 7 && "Depoimentos e avaliações de clientes"}
            {step === 8 && "Precisa de sistema para gerenciar o negócio?"}
            {step === 9 && "Qual a principal ação que deseja no site?"}
            {step === 10 && "Informações adicionais e observações"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* STEP 1: Informações Básicas */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nomeEstabelecimento">
                  Nome do Estabelecimento
                </Label>
                <Input
                  id="nomeEstabelecimento"
                  value={formData.nomeEstabelecimento}
                  onChange={(e) =>
                    updateFormData("nomeEstabelecimento", e.target.value)
                  }
                  placeholder="Ex: Lanchonete do João"
                />
              </div>

              <div className="space-y-3">
                <Label>Tipo de Estabelecimento</Label>
                <RadioGroup
                  value={formData.tipoEstabelecimento}
                  onValueChange={(value) =>
                    updateFormData("tipoEstabelecimento", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lanchonete" id="tipo1" />
                    <Label htmlFor="tipo1">Lanchonete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="restaurante" id="tipo2" />
                    <Label htmlFor="tipo2">Restaurante</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pizzaria" id="tipo3" />
                    <Label htmlFor="tipo3">Pizzaria</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hamburgueria" id="tipo4" />
                    <Label htmlFor="tipo4">Hamburgueria</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="padaria" id="tipo5" />
                    <Label htmlFor="tipo5">Padaria</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="tipo6" />
                    <Label htmlFor="tipo6">Outro</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Qual o objetivo principal do site?</Label>
                <RadioGroup
                  value={formData.objetivoPrincipal}
                  onValueChange={(value) =>
                    updateFormData("objetivoPrincipal", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="so-informacao" id="obj1" />
                    <Label htmlFor="obj1">
                      Só mostrar informações (cardápio, horário, contato)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pedidos-online" id="obj2" />
                    <Label htmlFor="obj2">
                      Receber pedidos online (WhatsApp ou sistema próprio)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="crm-gestao" id="obj3" />
                    <Label htmlFor="obj3">
                      Sistema completo de gestão (CRM, controle de pedidos,
                      estoque)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tudo" id="obj4" />
                    <Label htmlFor="obj4">
                      Tudo junto (informações + pedidos + gestão)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>
                  Funcionalidades desejadas (marque todas que desejar)
                </Label>
                <div className="space-y-2">
                  {[
                    "Cardápio online",
                    "Sistema de pedidos",
                    "Pagamento online",
                    "Reservas de mesa",
                    "Avaliações de clientes",
                    "Blog/Receitas",
                    "Programa de fidelidade",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`func-${item}`}
                        checked={formData.funcionalidades.includes(item)}
                        onCheckedChange={() =>
                          toggleArrayItem("funcionalidades", item)
                        }
                      />
                      <Label htmlFor={`func-${item}`}>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Cardápio */}
          {step === 2 && (
            <>
              <div className="space-y-3">
                <Label>Já tem um cardápio pronto?</Label>
                <RadioGroup
                  value={formData.temCardapio}
                  onValueChange={(value) =>
                    updateFormData("temCardapio", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="cardapio1" />
                    <Label htmlFor="cardapio1">
                      Sim, tenho cardápio completo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parcial" id="cardapio2" />
                    <Label htmlFor="cardapio2">
                      Tenho parcialmente, preciso organizar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="cardapio3" />
                    <Label htmlFor="cardapio3">
                      Não tenho, preciso criar do zero
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {(formData.temCardapio === "sim" ||
                formData.temCardapio === "parcial") && (
                <div className="space-y-2">
                  <Label htmlFor="quantidadeItens">
                    Quantos itens aproximadamente?
                  </Label>
                  <Input
                    id="quantidadeItens"
                    value={formData.quantidadeItens}
                    onChange={(e) =>
                      updateFormData("quantidadeItens", e.target.value)
                    }
                    placeholder="Ex: 50 itens"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="categoriasCardapio">
                  Quais categorias do cardápio?
                </Label>
                <Textarea
                  id="categoriasCardapio"
                  value={formData.categoriasCardapio}
                  onChange={(e) =>
                    updateFormData("categoriasCardapio", e.target.value)
                  }
                  placeholder="Ex: Lanches, Porções, Bebidas, Sobremesas"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Tem fotos profissionais dos produtos?</Label>
                <RadioGroup
                  value={formData.temFotosComidas}
                  onValueChange={(value) =>
                    updateFormData("temFotosComidas", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim-todas" id="fotos1" />
                    <Label htmlFor="fotos1">
                      Sim, tenho fotos de todos os produtos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim-algumas" id="fotos2" />
                    <Label htmlFor="fotos2">Tenho de alguns produtos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="fotos3" />
                    <Label htmlFor="fotos3">Não tenho, preciso fazer</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Precisa de descrição detalhada de cada produto?</Label>
                <RadioGroup
                  value={formData.descricaoDetalhada}
                  onValueChange={(value) =>
                    updateFormData("descricaoDetalhada", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="desc1" />
                    <Label htmlFor="desc1">
                      Sim, com ingredientes e informações nutricionais
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basico" id="desc2" />
                    <Label htmlFor="desc2">Básico (só nome e preço)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medio" id="desc3" />
                    <Label htmlFor="desc3">
                      Médio (nome, ingredientes principais e preço)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {/* STEP 3: Sistema de Pedidos */}
          {step === 3 && (
            <>
              <div className="space-y-3">
                <Label>Quer receber pedidos online?</Label>
                <RadioGroup
                  value={formData.querPedidosOnline}
                  onValueChange={(value) =>
                    updateFormData("querPedidosOnline", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="pedidos1" />
                    <Label htmlFor="pedidos1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="pedidos2" />
                    <Label htmlFor="pedidos2">
                      Não, só informação de contato
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="futuro" id="pedidos3" />
                    <Label htmlFor="pedidos3">
                      Não agora, mas quero no futuro
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.querPedidosOnline === "sim" && (
                <div className="space-y-3">
                  <Label>Como quer receber os pedidos?</Label>
                  <div className="space-y-2">
                    {[
                      "WhatsApp (botão direto)",
                      "Formulário do site (envia email)",
                      "Sistema próprio de pedidos",
                      "Integração com iFood/Rappi",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tipo-pedido-${item}`}
                          checked={formData.tipoPedido.includes(item)}
                          onCheckedChange={() =>
                            toggleArrayItem("tipoPedido", item)
                          }
                        />
                        <Label htmlFor={`tipo-pedido-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.querPedidosOnline === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="formasPagamento">
                    Quais formas de pagamento aceita?
                  </Label>
                  <Textarea
                    id="formasPagamento"
                    value={formData.formasPagamento}
                    onChange={(e) =>
                      updateFormData("formasPagamento", e.target.value)
                    }
                    placeholder="Ex: Dinheiro, Cartão, Pix, VR, VA"
                    rows={2}
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label>Faz entrega?</Label>
                <RadioGroup
                  value={formData.temEntrega}
                  onValueChange={(value) => updateFormData("temEntrega", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="entrega1" />
                    <Label htmlFor="entrega1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="entrega2" />
                    <Label htmlFor="entrega2">Não, só retirada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ambos" id="entrega3" />
                    <Label htmlFor="entrega3">Sim, entrega e retirada</Label>
                  </div>
                </RadioGroup>
              </div>

              {(formData.temEntrega === "sim" ||
                formData.temEntrega === "ambos") && (
                <div className="space-y-2">
                  <Label htmlFor="areaEntrega">Qual a área de entrega?</Label>
                  <Textarea
                    id="areaEntrega"
                    value={formData.areaEntrega}
                    onChange={(e) =>
                      updateFormData("areaEntrega", e.target.value)
                    }
                    placeholder="Ex: Bairro Centro, Vila Nova, até 5km do estabelecimento"
                    rows={2}
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 4: Identidade Visual */}
          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="coresPreferidas">
                  Cores da marca / Preferências
                </Label>
                <Textarea
                  id="coresPreferidas"
                  value={formData.coresPreferidas}
                  onChange={(e) =>
                    updateFormData("coresPreferidas", e.target.value)
                  }
                  placeholder="Ex: Vermelho e amarelo (como McDonald's), verde e branco, etc"
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <Label>Estilo visual desejado</Label>
                <RadioGroup
                  value={formData.estiloVisual}
                  onValueChange={(value) =>
                    updateFormData("estiloVisual", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderno-minimalista" id="estilo1" />
                    <Label htmlFor="estilo1">
                      Moderno e Minimalista (limpo, simples)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rustico-aconchegante" id="estilo2" />
                    <Label htmlFor="estilo2">
                      Rústico e Aconchegante (madeira, tons terrosos)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vibrante-divertido" id="estilo3" />
                    <Label htmlFor="estilo3">
                      Vibrante e Divertido (cores fortes, alegre)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elegante-sofisticado" id="estilo4" />
                    <Label htmlFor="estilo4">
                      Elegante e Sofisticado (preto, dourado, luxo)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Já tem logo?</Label>
                <RadioGroup
                  value={formData.temLogo}
                  onValueChange={(value) => updateFormData("temLogo", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="logo1" />
                    <Label htmlFor="logo1">Sim, tenho logo pronta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="logo2" />
                    <Label htmlFor="logo2">Não, preciso criar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="refazer" id="logo3" />
                    <Label htmlFor="logo3">Tenho, mas quero refazer</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenciasVisuais">
                  Tem algum site ou estabelecimento que admira?
                </Label>
                <Input
                  id="referenciasVisuais"
                  value={formData.referenciasVisuais}
                  onChange={(e) =>
                    updateFormData("referenciasVisuais", e.target.value)
                  }
                  placeholder="Ex: Gosto do site do Burger King, ou do visual da pizzaria X"
                />
              </div>
            </>
          )}

          {/* STEP 5: Sobre o Estabelecimento */}
          {step === 5 && (
            <>
              <div className="space-y-3">
                <Label>Tem uma história legal para contar?</Label>
                <RadioGroup
                  value={formData.temHistoria}
                  onValueChange={(value) =>
                    updateFormData("temHistoria", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="historia1" />
                    <Label htmlFor="historia1">
                      Sim, quero compartilhar a história
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="historia2" />
                    <Label htmlFor="historia2">
                      Não, prefiro focar nos produtos
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.temHistoria === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="historiaTexto">
                    Conte a história do estabelecimento
                  </Label>
                  <Textarea
                    id="historiaTexto"
                    value={formData.historiaTexto}
                    onChange={(e) =>
                      updateFormData("historiaTexto", e.target.value)
                    }
                    placeholder="Ex: Começou com meu avô em 1980, receita de família, tradição de 40 anos..."
                    rows={4}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="diferenciais">
                  O que te diferencia da concorrência?
                </Label>
                <Textarea
                  id="diferenciais"
                  value={formData.diferenciais}
                  onChange={(e) =>
                    updateFormData("diferenciais", e.target.value)
                  }
                  placeholder="Ex: Ingredientes frescos, receita secreta, atendimento personalizado, entrega rápida"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horarioFuncionamento">
                  Horário de funcionamento
                </Label>
                <Textarea
                  id="horarioFuncionamento"
                  value={formData.horarioFuncionamento}
                  onChange={(e) =>
                    updateFormData("horarioFuncionamento", e.target.value)
                  }
                  placeholder="Ex: Seg-Sex: 11h às 23h, Sáb-Dom: 12h às 00h"
                  rows={2}
                />
              </div>
            </>
          )}

          {/* STEP 6: Localização e Contato */}
          {step === 6 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço completo</Label>
                <Textarea
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => updateFormData("endereco", e.target.value)}
                  placeholder="Ex: Rua das Flores, 123 - Centro - São Paulo - SP"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => updateFormData("telefone", e.target.value)}
                  placeholder="Ex: (11) 98765-4321"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="redesSociais">Redes sociais</Label>
                <Textarea
                  id="redesSociais"
                  value={formData.redesSociais}
                  onChange={(e) =>
                    updateFormData("redesSociais", e.target.value)
                  }
                  placeholder="Ex: @lanchonete_joao (Instagram), facebook.com/lanchonetejoao"
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <Label>Precisa de mapa integrado no site?</Label>
                <RadioGroup
                  value={formData.precisaMapa}
                  onValueChange={(value) =>
                    updateFormData("precisaMapa", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="mapa1" />
                    <Label htmlFor="mapa1">Sim, com Google Maps</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="mapa2" />
                    <Label htmlFor="mapa2">Não precisa</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {/* STEP 7: Avaliações */}
          {step === 7 && (
            <>
              <div className="space-y-3">
                <Label>Tem avaliações de clientes?</Label>
                <RadioGroup
                  value={formData.temAvaliacoes}
                  onValueChange={(value) =>
                    updateFormData("temAvaliacoes", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="avaliacoes1" />
                    <Label htmlFor="avaliacoes1">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="avaliacoes2" />
                    <Label htmlFor="avaliacoes2">Não</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.temAvaliacoes === "sim" && (
                <div className="space-y-3">
                  <Label>Onde estão as avaliações?</Label>
                  <div className="space-y-2">
                    {[
                      "Google Meu Negócio",
                      "Facebook",
                      "Instagram (comentários)",
                      "iFood",
                      "Tenho prints/mensagens",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`avaliacoes-${item}`}
                          checked={formData.tiposAvaliacoes.includes(item)}
                          onCheckedChange={() =>
                            toggleArrayItem("tiposAvaliacoes", item)
                          }
                        />
                        <Label htmlFor={`avaliacoes-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.temAvaliacoes === "sim" && (
                <div className="space-y-2">
                  <Label htmlFor="quantidadeAvaliacoes">
                    Quantas avaliações aproximadamente?
                  </Label>
                  <Input
                    id="quantidadeAvaliacoes"
                    value={formData.quantidadeAvaliacoes}
                    onChange={(e) =>
                      updateFormData("quantidadeAvaliacoes", e.target.value)
                    }
                    placeholder="Ex: Cerca de 50 avaliações positivas"
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 8: CRM / Gestão */}
          {step === 8 && (
            <>
              <div className="space-y-3">
                <Label>Precisa de sistema de gestão (CRM)?</Label>
                <RadioGroup
                  value={formData.precisaCRM}
                  onValueChange={(value) => updateFormData("precisaCRM", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="crm1" />
                    <Label htmlFor="crm1">
                      Sim, quero gerenciar tudo pelo sistema
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="talvez" id="crm2" />
                    <Label htmlFor="crm2">Talvez, quero saber mais sobre</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="crm3" />
                    <Label htmlFor="crm3">
                      Não, só quero site institucional
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {(formData.precisaCRM === "sim" ||
                formData.precisaCRM === "talvez") && (
                <div className="space-y-3">
                  <Label>Quais funcionalidades de gestão te interessam?</Label>
                  <div className="space-y-2">
                    {[
                      "Controle de pedidos",
                      "Controle de estoque",
                      "Relatórios de vendas",
                      "Cadastro de clientes",
                      "Programa de fidelidade",
                      "Controle financeiro",
                      "Gestão de entregas",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`crm-${item}`}
                          checked={formData.funcionalidadesCRM.includes(item)}
                          onCheckedChange={() =>
                            toggleArrayItem("funcionalidadesCRM", item)
                          }
                        />
                        <Label htmlFor={`crm-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="integracoes">
                  Precisa integrar com algum sistema existente?
                </Label>
                <Input
                  id="integracoes"
                  value={formData.integracoes}
                  onChange={(e) =>
                    updateFormData("integracoes", e.target.value)
                  }
                  placeholder="Ex: Sistema de caixa, ERP, iFood"
                />
              </div>
            </>
          )}

          {/* STEP 9: CTAs */}
          {step === 9 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="ctaPrincipal">
                  Qual a principal ação que quer no site?
                </Label>
                <Textarea
                  id="ctaPrincipal"
                  value={formData.ctaPrincipal}
                  onChange={(e) =>
                    updateFormData("ctaPrincipal", e.target.value)
                  }
                  placeholder="Ex: Fazer Pedido, Ver Cardápio, Falar no WhatsApp, Ligar Agora"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outrosDesejos">
                  Outras funcionalidades ou desejos específicos?
                </Label>
                <Textarea
                  id="outrosDesejos"
                  value={formData.outrosDesejos}
                  onChange={(e) =>
                    updateFormData("outrosDesejos", e.target.value)
                  }
                  placeholder="Ex: Quero um app mobile no futuro, sistema de cupons de desconto, etc"
                  rows={3}
                />
              </div>
            </>
          )}

          {/* STEP 10: Observações */}
          {step === 10 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="observacoes">
                  Observações finais ou informações importantes
                </Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) =>
                    updateFormData("observacoes", e.target.value)
                  }
                  placeholder="Qualquer informação adicional que acha importante..."
                  rows={5}
                />
              </div>

              <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Quase lá! 🎉
                </h3>
                <p className="text-sm text-blue-800">
                  Depois de finalizar, você poderá enviar todas as informações
                  via WhatsApp ou baixar um arquivo completo com o levantamento.
                </p>
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button
              onClick={prevStep}
              variant="outline"
              disabled={step === 1}
              className="cursor-pointer bg-transparent"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={nextStep} className="cursor-pointer">
              {step === totalSteps ? "Finalizar" : "Próximo"}
              {step < totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
