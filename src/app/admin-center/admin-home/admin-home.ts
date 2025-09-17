import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Chart, ChartConfiguration, ChartConfigurationCustomTypesPerDataset} from 'chart.js';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-admin-home',
    imports: [],
    templateUrl: './admin-home.html',
    styleUrl: './admin-home.scss'
})
export class AdminHomeComponent implements OnInit {

    private platformId = inject(PLATFORM_ID);

    ngOnInit(): void {
        this.loadedChart();
    }

    loadedChart() {

        if (!isPlatformBrowser(this.platformId)) {
            console.log('Is not browser!!!');
            return;
        }
        const repartitionChart = document.getElementById('repartitionChart') as HTMLCanvasElement;

        if (!repartitionChart) {
            console.log('No canvas found');
            return;
        }
        const ctx = repartitionChart.getContext('2d');
        let chart;

        const initialData = {
            labels: ['Cadres', 'ETAM', 'Ouvriers'],
            datasets: [{
                label: 'Montant des souscriptions en €',
                data: [580250, 420117, 234200], // Données initiales
                backgroundColor: [
                    'rgba(220, 38, 38, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(252, 165, 165, 0.7)'
                ],
                borderColor: [
                    'rgba(220, 38, 38, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(252, 165, 165, 1)'
                ],
                borderWidth: 1
            }]
        };

        const chartConfig: ChartConfiguration | ChartConfigurationCustomTypesPerDataset = {
            type: 'doughnut',
            data: initialData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context: { label: string; parsed: number | bigint | null; }) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('fr-FR', {
                                        style: 'currency',
                                        currency: 'EUR'
                                    }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                }
            },
        };

        if (!ctx) {
            console.log('No context found');
            return;
        }
        chart = new Chart(ctx, chartConfig);

        // --- Logique des filtres ---
        const applyFiltersBtn = document.getElementById('apply-filters-btn');
        const metricTotal = document.getElementById('metric-total');
        const metricCount = document.getElementById('metric-count');
        const metricNov = document.getElementById('metric-nov');
        const metricDec = document.getElementById('metric-dec');

        const formatCurrency = (value: number | bigint) => new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
        const formatNumber = (value: number | bigint) => new Intl.NumberFormat('fr-FR').format(value);

        if (applyFiltersBtn && metricTotal && metricCount && metricNov && metricDec)
            applyFiltersBtn.addEventListener('click', () => {
                // Simulation de mise à jour des données
                const newTotal = Math.floor(Math.random() * 800000) + 100000;
                const newCount = Math.floor(Math.random() * 1000) + 100;
                const newNov = Math.floor(newTotal * (Math.random() * 0.3 + 0.2));
                const newDec = Math.floor(newTotal * (Math.random() * 0.3 + 0.3));

                const newCadres = Math.floor(newTotal * (Math.random() * 0.4 + 0.3));
                const newEtam = Math.floor(newTotal * (Math.random() * 0.3 + 0.2));
                const newOuvriers = newTotal - newCadres - newEtam;

                // Mise à jour des métriques
                metricTotal.textContent = formatCurrency(newTotal);
                metricCount.textContent = formatNumber(newCount);
                metricNov.textContent = formatCurrency(newNov);
                metricDec.textContent = formatCurrency(newDec);

                // Mise à jour du graphique
                chart.data.datasets[0].data = [newCadres, newEtam, newOuvriers];
                chart.update();
            });
    }
}
